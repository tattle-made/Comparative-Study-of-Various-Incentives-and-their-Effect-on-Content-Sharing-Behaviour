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

module.exports = { sendEmail };

(async () => {
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

        <p>You will be shown five posts on the first day, and ten each after that for two consecutive days. You may choose to share or not share those posts. You will be rewarded for sharing true content and penalised for sharing false content. You will have to read the post and use your judgement to classify which content is true, which is false, and which would spread joy.</p>

        <p>Please use the following username and password to log in to our system <span style="font-weight: bold;">over the next three days.</span> First, you will read the consent form. Next, you will be onboarded and shown the posts.
        <p>

        <p>Social Media Platform Link: <br>
            Username: <br>
            Password:</p>

        <p>In case you have any questions or concerns, please feel free to write back to me. Thanks!</p>

        <p>Best,<br>
        Arathy</p>

        </div>
    </body>

    </html>
    `;
  await sendEmail({
    subject: "Tattle and Prayogshala’s Social Media Study is now live!",
    body,
    receiver: "denny@tattle.co.in",
  });
})();
