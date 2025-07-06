import { createRequire } from 'module'
import dayjs from 'dayjs';
const require = createRequire(import.meta.url);
const { serve } =  require("@upstash/workflow/express");

import Subscription from '../models/subscription.model.js';

export const sendReminders = serve(async(context) => {
    console.log("Workflow endpoint called with payload:", context.requestPayload);
    const subscriptionId = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`The renewal date of subscription ${subscriptionId} has been passed. Stopping workflow`);
        return;
    }

    const remainderDays = [10, 7, 5, 3, 1];

    for (const remDays of remainderDays) {
        const reminderDate = renewalDate.subtract(remDays, 'day');

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${remDays} before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${remDays} before`);
    }

});

async function fetchSubscription(context, subscriptionId) {
    return await context.run("get subscription", async () => {
        return await Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

async function sleepUntilReminder(context, label, date){
    console.log(`Sleeping until ${label} reminder at ${label}`);
    await context.sleep(label, date.toDate()); 
}

async function triggerReminder(context, label) {
    return await context.run(label, async () => {
        console.log("Triggering reminder");
        //Email SMS
     });
}