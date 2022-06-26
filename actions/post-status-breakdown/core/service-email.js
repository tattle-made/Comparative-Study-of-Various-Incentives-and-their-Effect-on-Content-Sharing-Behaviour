const AWS = require("aws-sdk");
const { email } = require("../config");

const { SERVICE_AWS_ACCESS_KEY_ID, SERVICE_AWS_SECRET_ACCESS_KEY } =
  process.env;

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
    Source: email.sender,
    ReplyToAddresses: [email.sender],
  };

  return params;
};

const sendEmail = async ({ subject, body, receiver }) => {
  const env = process.env.NODE_ENV;
  if (env === "development" || env === "test") {
    receiver = email.testTarget;
  }

  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(constructOnboardingParamsObject({ subject, body, receiver }))
    .promise();
  try {
    await sendPromise;
    console.log("Success : Email Sent");
  } catch (error) {
    console.log("Error : Could not send email");
    throw error;
  }
};

module.exports = {
  sendEmail,
};
