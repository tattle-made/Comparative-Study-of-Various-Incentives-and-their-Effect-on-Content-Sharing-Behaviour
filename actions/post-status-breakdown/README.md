[![Generate Dashboard](https://github.com/tattle-made/Comparative-Study-of-Various-Incentives-and-their-Effect-on-Content-Sharing-Behaviour/actions/workflows/test-cron.yml/badge.svg?branch=main&event=schedule)](https://github.com/tattle-made/Comparative-Study-of-Various-Incentives-and-their-Effect-on-Content-Sharing-Behaviour/actions/workflows/test-cron.yml)

This action updates the google spreadsheet this project uses for bookkeeping all aspects of the user study. It fetches data from the sql database of the app, transforms it and updates it on a google spreadsheet.
This action is meant to be run periodically on a github action runner.

# TESTS

- Get the credentials.json for your service account and place it in the root folder.
