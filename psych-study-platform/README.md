
# Operations

## Setup
```
// bring up required infrastructure - db, db gui etc
docker-compose up               

// install backend dependencies and setup database
cd backend && npm install         
npx sequelize-cli db:migrate
npx sequelize-cli db:seed --seed name-of-seed

cd ..
cd frontend && npm install
```

## Setup environment variables
```
JWT_ACCESS_TOKEN_KEY=
JWT_REFRESH_TOKEN_KEY=
```
both were generatd using `require('crypto').randomBytes(64).toString('hex')`

## Start Project
```
npm run dev
```
Open browser and visit http://localhost:1234

## Installing new packages from root
```
npm install --save cors --prefix backend
npm install --save react react-dom --prefix frontend 
```