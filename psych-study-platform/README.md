
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
PASETO_PRIVATE_KEY=
```

## Start Project
```
npm run dev
```
Open browser and visit http://localhost:1234

## Installing new packages
```
npm install --save cors --prefix backend
npm install --save react react-dom --prefix frontend 
```