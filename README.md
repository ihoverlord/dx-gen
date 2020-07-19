# dx-gen

Generate Nodejs / Expressjs based project with just a cli command.


## Instructions

### Setup

`npm i -g dx-gen`

### New Project

`dx-gen --project [name]`

`cd [Project Dir]`

`npm i`

### New API Module

`dx-gen --api [name]`

Import & Declare newly generated routes in `src/routes.js`

### Auth Module

`dx-gen --auth`

Import & Declare newly generated Auth routes in `src/routes.js`


### Start DEV server
For this you will need `nodemon` module. 

`npm i -g nodemon`

`npm run start:dev`

### Start Production server

For this you will need `pm2` module. 

`npm i pm2`

`npm run start:prod`



