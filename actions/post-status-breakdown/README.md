[![Generate Dashboard](https://github.com/tattle-made/Comparative-Study-of-Various-Incentives-and-their-Effect-on-Content-Sharing-Behaviour/actions/workflows/test-cron.yml/badge.svg?branch=main&event=schedule)](https://github.com/tattle-made/Comparative-Study-of-Various-Incentives-and-their-Effect-on-Content-Sharing-Behaviour/actions/workflows/test-cron.yml)

This Github Action consolidates scripts used to automate workflows associated with the psychology study platform associated with this project.

Code related to various functionalities are grouped in folders - study-emails, for instance.

The bot would need to access the psych study production database, aws ses and the user study bookkeeping Google Doc. The bot's operations and scheduling is managed by Github Actions.

# TESTS

- Get the credentials.json for your service account and place it in the root folder.

## Testing Study related email mechanism

`node study-emails/test.js` will run the entire test suite.
Remember to commment out tests you don't want to run.
