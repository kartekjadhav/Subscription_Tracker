import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import sendEmailReminder from '../utils/send-email.js';

export const sendReminders = serve(async(context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    //If renewl date has already passed
    if (renewalDate.isBefore(dayjs())){
        console.log(`Renewal date of subscription id ${subscriptionId} has already been passed`);
        return;
    }

    const reminderDays = [10, 7, 5, 3, 1];

    for(const remDay of reminderDays) {
        const reminderDate = renewalDate.subtract(remDay, 'day');

        let label = `Reminder before ${reminderDate} days`
        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, label, reminderDate);
        }

        if(dayjs().isSame(reminderDate, 'day')){
            console.log('triggered');
            
            await triggerReminder(context, label, remDay, subscription);
        }
    }
});

async function fetchSubscription(context, subscriptionId) {
    return await context.run('get subscription', async() => {
        return await Subscription.findById(subscriptionId).populate({path: 'user', select: 'name, email'});
    })
}

async function sleepUntilReminder(context, label, date) {
    console.log(`Sleeping until ${label} until ${date}`);
    await context.sleepUntil(label, date.toDate());
};

async function triggerReminder(context, label, remDay, subscription) {
    return await context.run(label, async() => {
        console.log("Triggering reminder");
        await sendEmailReminder(subscription.user.email, remDay, subscription);
    })
}