# Replicate Study

If you wish to recreate the same environment as our study. You will need to see the database using our seeder scripts

```
npx sequelize-cli db:seed --seed 20220427133747-add-posts.js
npx sequelize-cli db:seed --seed 20220427152548-add-2000-users.js
npx sequelize-cli db:seed --seed 20220427162256-allocate-posts.js
```