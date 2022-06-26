function sendOnboardingEmail(user) {
  const body = `
    <!DOCTYPE html>
    <html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello from Monk Prayogshala and Tattle!</title>
        <meta name="description" content="description" />
        <meta name="author" content="tattle|mp" />
        <meta name="keywords" content="social media, study" />
        <style type="text/css">
        .body {
            width: auto;
        }
        </style>
    </head>

    <body>
        <div>
        <p>Hello,
        </p>
        <p>
            Thank you for participating in our study on social media sharing by Tattle and Monk Prayogshala!
        </p>
        <p>Please read the following in detail:
        <p>

        <p>You will be participating in the study <span style="font-weight: bold;">over three days.</span></p>

        <p>You will be shown five posts on the first day, and ten each after that for two consecutive days. You may choose to share or not share those posts within our platform. You will be rewarded for sharing true content and penalised for sharing false content. You will have to read the post and use your judgement to classify which content is true, which is false, and which would spread joy.</p>

        <p>Please use the following username and password to log in to our system <span style="font-weight: bold;">over the next three days.</span> First, you will read the consent form. Next, you will be onboarded and shown the posts.
        <p>

        <p>Social Media Platform Link: https://meshi.tattle.co.in/<br>
            Username: ${user.username} <br>
            Password: ${user.password}</p>

        <p>In case you have any questions or concerns, please feel free to write back to me. Thanks!</p>

        <p>Best,<br>
        Arathy</p>

        </div>
    </body>

    </html>`;
  const subject =
    "Tattle and Monk Prayogshala’s Social Media Study is now live!";
  const receiver = user.email;
  return {
    subject,
    body,
    receiver,
  };
}

function sendPostDayOneReminder(user) {
  const body = `
    <!DOCTYPE html>
    <html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello from Monk Prayogshala and Tattle!</title>
        <meta name="description" content="description" />
        <meta name="author" content="tattle|mp" />
        <meta name="keywords" content="social media, study" />
        <style type="text/css">
        .body {
            width: auto;
        }
        </style>
    </head>

    <body>
        <div>
        <p>Hello,
        </p>
        <p>
        Thank you for participating on the first day. Please log back in and complete your task today! You should log in every 24 hours after you finish viewing the posts for a day. If you log in before that, you will not be able to see new posts for that day.
        </p>
        <p>As a reminder, your login information is as follows:</p>

        <p>Social Media Platform Link: https://meshi.tattle.co.in/<br>
            Username: ${user.username} <br>
            Password: ${user.password}</p>

        <p>In case you have any questions or concerns, please feel free to write back to me. Thanks!
        </p>

        <p>Best,<br>
        Arathy</p>

        </div>
    </body>

    </html>`;
  const subject = "Day 2 of Tattle and Monk Prayogshala’s Social Media Study";
  const receiver = user.email;

  return {
    subject,
    body,
    receiver,
  };
}

function sendPostDayTwoReminder(user) {
  const body = `
    <!DOCTYPE html>
    <html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello from Monk Prayogshala and Tattle!</title>
        <meta name="description" content="description" />
        <meta name="author" content="tattle|mp" />
        <meta name="keywords" content="social media, study" />
        <style type="text/css">
        .body {
            width: auto;
        }
        </style>
    </head>

    <body>
        <div>
        <p>Hello,
        </p>
        <p>
        Thank you for participating on the first and the second days.  You should log in every 24 hours after you finish viewing the posts for a day. If you log in before that, you will not be able to see new posts for that day.
        </p>
        <p>As a reminder, your login information is as follows:</p>

        <p>Social Media Platform Link: https://meshi.tattle.co.in/<br>
            Username: ${user.username} <br>
            Password: ${user.password}</p>

        <p>In case you have any questions or concerns, please feel free to write back to me. Thanks!
        </p>

        <p>Best,<br>
        Arathy</p>

        </div>
    </body>

    </html>
    `;

  const subject = "Day 3 of Tattle and Monk Prayogshala’s Social Media Study";
  const receiver = user.email;

  return {
    subject,
    body,
    receiver,
  };
}

function sendReminderEmailToNonLoggedInUsers(user) {
  const body = `
    <!DOCTYPE html>
    <html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello from Monk Prayogshala and Tattle!</title>
        <meta name="description" content="description" />
        <meta name="author" content="tattle|mp" />
        <meta name="keywords" content="social media, study" />
        <style type="text/css">
        .body {
            width: auto;
        }
        </style>
    </head>

    <body>
        <div>
        <p>Hello again,
        </p>
        <p>
        Thank you for signing up for our study on social media sharing! In case you missed our earlier email, please read the following if you'd like to continue to participate:
        </p>

        <p>
        You will be participating in the study over three days.
        </p>

        <p>
        You will be shown five posts on the first day, and ten each after that for two consecutive days. You may choose to share or not share those posts within our platform. You will be rewarded for sharing true content and penalised for sharing false content. You will have to read the post and use your judgement to classify which content is true, which is false, and which would spread joy.
        </p>

        

        <p>
        Please use the following username and password to log in to our system over the next three days. First, you will read the consent form. Next, you will be onboarded and shown the posts.</p>

        <p>Social Media Platform Link: https://meshi.tattle.co.in/<br>
            Username: ${user.username} <br>
            Password: ${user.password}</p>

        <p>In case you have any questions or concerns, please feel free to write back to me. We promise not to bother you again if you choose not to participate. Thanks!
        </p>

        <p>Best,<br>
        Arathy</p>

        </div>
    </body>

    </html>
    `;

  const subject =
    "Reminder: Tattle and Monk Prayogshala's Social Media Study is now Live!";
  const receiver = user.email;

  return {
    subject,
    body,
    receiver,
  };
}

function sendPaymentReminder(user) {
  const body = `
    <!DOCTYPE html>
    <html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello from Monk Prayogshala and Tattle!</title>
        <meta name="description" content="description" />
        <meta name="author" content="tattle|mp" />
        <meta name="keywords" content="social media, study" />
        <style type="text/css">
        .body {
            width: auto;
        }
        </style>
    </head>

    <body>
        <div>
        <p>Hello again,
        </p>
        <p>
        Thank you for participating in our study on social media sharing!
        </p>

        <p>
        You will be receiving an email with a RazorpayX link that will let you get paid participating in the study. You will receive this email within 10 days from completing the study.
        </p>

        <p>The payments to be received by you may get delayed due to some reasons. Here are some:</p>
        <ul>
            <li>There may be a delay in receiving payments by your bank</li>
            <li>The UPI ID and other details provided may be incorrect</li>
            <li>Razorpay link might have expired</li>
            <li>The Razorpay link might have been sent to your spam folder</li>
        </ul>

        <p>In case any of these issues come about, or if there is a hurdle you are facing that is not listed here, please do not hesitate to reach out.</p>

        <p>Best,<br>
        Arathy</p>

        </div>
    </body>

    </html>
    `;

  const subject = "Regarding Tattle and Monk Prayogshala's Social Media Study!";
  const receiver = user.email;

  return {
    subject,
    body,
    receiver,
  };
}

function makeEmail(type, user) {
  const map = {
    onboarding: sendOnboardingEmail,
    postDay1Reminder: sendPostDayOneReminder,
    postDay2Reminder: sendPostDayTwoReminder,
    unLoggedInUserReminder: sendReminderEmailToNonLoggedInUsers,
    paymentReminder: sendPaymentReminder,
  };
  return map[type](user);
}

module.exports = {
  makeEmail,
};
