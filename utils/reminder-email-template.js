export function getSubscriptionReminderEmail(
  { user, 
    subscriptionName, 
    price, 
    renewalDate, 
    frequency }) {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">
      <table width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">
        <tr>
          <td>
            <h2 style="color: #333333;">Hi ${user},</h2>
            <p style="font-size: 16px; color: #555555;">
              Just a friendly reminder that your subscription is due for renewal.
            </p>

            <table width="100%" style="margin-top: 20px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Subscription</td>
                <td style="padding: 8px 0; color: #666;">${subscriptionName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Price</td>
                <td style="padding: 8px 0; color: #666;">₹${price}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Renewal Date</td>
                <td style="padding: 8px 0; color: #666;">${renewalDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Frequency</td>
                <td style="padding: 8px 0; color: #666;">${frequency}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 15px; color: #555;">
              Please make sure you have sufficient balance or update your payment method to avoid interruption.
            </p>

            <p style="font-size: 14px; color: #888; margin-top: 40px;">
              If you have any questions, feel free to contact us at
              <a href="mailto:support@example.com" style="color: #0066cc;">support@example.com</a>.
            </p>

            <p style="font-size: 13px; color: #aaa; margin-top: 30px;">
              You received this email because you subscribed to <strong>${subscriptionName}</strong>.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export const emailTemplates = {
  10: {
    getSubject: (subscriptionName) => `🕧Your ${subscriptionName} subscription renewes in 10 days!`,
    getEmailBody: (data) => {
      const { userName, subscriptionName, frequency, price, renewalDate } = {...data};
      return getSubscriptionReminderEmail(userName, subscriptionName, price, renewalDate, frequency); 
    }
  },

  7: {
    getSubject: (subscriptionName) => `🕧Your ${subscriptionName} subscription renewes in 7 days!`,
    getEmailBody: (data) => {
      const { userName, subscriptionName, frequency, price, renewalDate } = {...data};
      return getSubscriptionReminderEmail(userName, subscriptionName, price, renewalDate, frequency); 
    }
  },

  5: {
    getSubject: (subscriptionName) => `🕧Your ${subscriptionName} subscription renewes in 5 days!`,
    getEmailBody: (data) => {
      const { userName, subscriptionName, frequency, price, renewalDate } = {...data};
      return getSubscriptionReminderEmail(userName, subscriptionName, price, renewalDate, frequency); 
    }
  },

  3: {
    getSubject: (subscriptionName) => `🕧Your ${subscriptionName} subscription renewes in 3 days!`,
    getEmailBody: (data) => {
      const { userName, subscriptionName, frequency, price, renewalDate } = {...data};
      return getSubscriptionReminderEmail(userName, subscriptionName, price, renewalDate, frequency); 
    }
  },

  1: {
    getSubject: (subscriptionName) => `‼️Your ${subscriptionName} subscription renewes in 1 days!`,
    getEmailBody: (data) => {
      const { userName, subscriptionName, frequency, price, renewalDate } = {...data};
      return getSubscriptionReminderEmail(userName, subscriptionName, price, renewalDate, frequency); 
    }
  }
}