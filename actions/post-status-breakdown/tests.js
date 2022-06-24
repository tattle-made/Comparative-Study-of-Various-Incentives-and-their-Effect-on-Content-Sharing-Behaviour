const creds = require("./credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const { userFactory } = require("./userFactory");
const { findScheduledEmails } = require("./userStudyEmailManager");

// Test User Factor
async function testUserFactory() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[8];
  const rows = await sheet.getRows();
  for (const row of rows) {
    const user = userFactory(row);
    console.log(user);
  }
}

// Test Schedule Function
async function testScheduleFunction() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[8];
  const rows = await sheet.getRows();
  for (const row of rows) {
    const user = userFactory(row);
    if (isNaN(user.session)) {
      continue;
    } else {
      const scheduledEmails = findScheduledEmails(user);
      console.log(
        scheduledEmails.map((email) => {
          return {
            type: email.type,
            user: email.user.username,
          };
        })
      );
    }
  }
}

(async function testSuite() {
  //   await testUserFactory();
  await testScheduleFunction();
})();
