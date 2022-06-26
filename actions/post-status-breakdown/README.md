[![Generate Dashboard](https://github.com/tattle-made/Comparative-Study-of-Various-Incentives-and-their-Effect-on-Content-Sharing-Behaviour/actions/workflows/test-cron.yml/badge.svg?branch=main&event=schedule)](https://github.com/tattle-made/Comparative-Study-of-Various-Incentives-and-their-Effect-on-Content-Sharing-Behaviour/actions/workflows/test-cron.yml)

This Github Action consolidates scripts used to automate workflows associated with the psychology study platform associated with this project.

Code related to various functionalities are grouped in folders - study-emails, for instance.

The bot would need to access the psych study production database, aws ses and the user study bookkeeping Google Doc. The bot's operations and scheduling is managed by Github Actions.

# Testing

While the scripts don't have full test coverage, I have written simple test functions one could run to cover the brittle parts of code. Follow the instructions here to get them running before running the automation scripts.

## Prerequisites

### Enviornment Variables and Credentials

1. The following environment variables need to be set before you can run the tests

| variable                      | value | description            |
| ----------------------------- | ----- | ---------------------- |
| NODE_ENV                      | test  |                        |
| SERVICE_AWS_ACCESS_KEY_ID     |       | used to access aws ses |
| SERVICE_AWS_SECRET_ACCESS_KEY |       |                        |
| DB_HOST                       |       |                        |
| DB_USERNAME                   |       |                        |
| DB_PASSWORD                   |       |                        |

2. A file containing credentials for your Google Service Account named `credentials.json` need to be placed in the root folder of the `post-status-breakdown/`. The email id associated with this account should be given access to the Google Docs you wish this action to read/write to.

### Script Configuration

Double check the fields in `config.js` so you don't accidentally write to an unintended location.

## Testing Study related email mechanism

`node study-emails/test.js` will run the entire test suite.
Remember to commment out tests you don't want to run.
