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

### Auth Module

`dx-gen --auth [name]`

Now install `bcrypt` module using `npm i bcrypt`

### Start DEV server

`npm run start:dev`

### Start Production server

For this you will need `pm2` module. 

`npm i pm2`

`npm run start:prod`
