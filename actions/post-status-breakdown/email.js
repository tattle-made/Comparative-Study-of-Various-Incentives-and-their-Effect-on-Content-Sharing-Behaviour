const AWS = require("aws-sdk");

const { SERVICE_AWS_ACCESS_KEY_ID, SERVICE_AWS_SECRET_ACCESS_KEY } =
  process.env;

console.log({
  SERVICE_AWS_ACCESS_KEY_ID,
  SERVICE_AWS_SECRET_ACCESS_KEY,
});

AWS.config.update({
  region: "ap-south-1",
  credentials: {
    accessKeyId: SERVICE_AWS_ACCESS_KEY_ID,
    secretAccessKey: SERVICE_AWS_SECRET_ACCESS_KEY,
  },
});

try {
} catch (error) {
  console.log("Could not connect to AWS SES");
}

const constructOnboardingParamsObject = ({ subject, body, receiver }) => {
  const params = {
    Destination: {
      ToAddresses: [receiver],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "ar@monkprayogshala.in",
    ReplyToAddresses: ["ar@monkprayogshala.in"],
  };

  return params;
};

const sendEmail = async ({ subject, body, receiver }) => {
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(constructOnboardingParamsObject({ subject, body, receiver }))
    .promise();
  try {
    await sendPromise;
    console.log("Success : Email");
  } catch (error) {
    console.log("Error : Could not send email");
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendOnboardingEmail,
  sendPostDayOneReminder,
  sendPostDayTwoReminder,
  sendReminderEmailToNonLoggedInUsers,
};

async function sendOnboardingEmail(user) {
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

        <p>You will be shown five posts on the first day, and ten each after that for two consecutive days. share or not share those posts within our platform. You will be rewarded for sharing true content and penalised for sharing false content. You will have to read the post and use your judgement to classify which content is true, which is false, and which would spread joy.</p>

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

    </html>
    `;
  await sendEmail({
    subject: "Tattle and Monk Prayogshala’s Social Media Study is now live!",
    body,
    receiver: user.email,
  });
}

async function sendPostDayOneReminder(user) {
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

    </html>
    `;
  await sendEmail({
    subject: "Day 2 of Tattle and Monk Prayogshala’s Social Media Study",
    body,
    receiver: user.email,
  });
}

async function sendPostDayTwoReminder(user) {
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
  await sendEmail({
    subject: "Day 3 of Tattle and Monk Prayogshala’s Social Media Study",
    body,
    receiver: user.email,
  });
}

async function sendReminderEmailToNonLoggedInUsers(user) {
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
  await sendEmail({
    subject:
      "Reminder: Tattle and Monk Prayogshala's Social Media Study is now Live!",
    body,
    receiver: user.email,
  });
}
