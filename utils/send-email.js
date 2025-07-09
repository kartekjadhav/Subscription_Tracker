import { emailTemplates } from "./reminder-email-template.js";
import { useremail } from "../config/nodemailer.js";
import transporter from "../config/nodemailer.js";

const sendEmailReminder = async (to, type, subscription) => {
    if(!to || !type || !subscription) throw new Error('Missing email parameters');

    const template = emailTemplates[type];

    const subject = template.getSubject(subscription.name);
    const body = template.getEmailBody({subscriptionName: subscription.name, userName: subscription.user.name, price: subscription.price, frequency: subscription.frequency, renewalDate: subscription.renewalDate });

    const mailOptions = {
        from: useremail,
        to: to,
        subject: subject,
        html: body, 
    }

    console.log(mailOptions);

    console.log('sending email reminder');
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log('Error while sending reminder email - ', err);
            return;
        }
        
        console.log('Mail sent successfully - ', info.response);
    })
}

export default sendEmailReminder;