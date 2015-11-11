## Setup Postgres with Sequelize

get Postgress app running on your machine


## install sequelize
npm install sequelize sequelize-cli pg pg-hstore --save

### DB setup

create .sequelizerc file in your root
cut and paste this code in there:

```javascript
var path = require('path');

module.exports = {
  'config': path.resolve('./server', 'config.json'),
  'migrations-path': path.resolve('./server', 'migrations'),
  'models-path': path.resolve('./server', 'models'),
  'seeders-path': path.resolve('./server', 'seeders')
}
```

now we are going to run init.

> because we didnt  install sequelize globally we have to run our commands with a path to our node_modules `node_modules/.bin/sequelize`

```sh
node_modules/.bin/sequelize init
```

dang!!! look at that sweet index.js file that squelize created, thanks to the boilerplate gods. As well we have a config.json that sets up our different database connections based on env variable

get into the config.json file and update the "development" and the "test" options.

we need to add our 
* username
* database names (should be related to the project)
* dialect

```javascript
{
  "development": {
    "username": "petej",
    "password": null,
    "database": "guest_app",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "petej",
    "password": null,
    "database": "guest_app_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },  
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
```

### Create DB's

in the command line run 

```sh
createdb guest_app
createdb guest_app_test

```

confirm creation by running
```sh
psql guest_app
psql guest_app_test

```

When you run each command, if psql opens you should see:

```
guest_app=#
```
```
guest_app_test=#
```

### Models

node_modules/.bin/sequelize model:create --name User --attributes "username:string, email:string, isAdmin:boolean"
node_modules/.bin/sequelize model:create --name Speaker  --attributes "first_name:string last_name:string, twitter:string, linkedin:string, date_speaking:date"


### Before We Migrate!

Update models and migrations folders with correct model info, validations and associations

### Migrate!

run 

```sh
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:migrate --env test

```
double check:

```sh
$ psql guest_app

# \d "Speakers"

# \d "Users"
```

look at all the fields and their types, do they look right? If not, no worries, as long as a table showed up, you are on the right track. We can tweak the tables schema's later 

ok cool, development DB and test DB set up |√| 

### how to setup for heroku and travis ci ???

### Update Schemas

```sh
node_modules/.bin/sequelize migration:create --name update-user
node_modules/.bin/sequelize migration:create --name update-speaker
```
update both the model file and the migration file

run 

```sh
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:migrate --env test

```





