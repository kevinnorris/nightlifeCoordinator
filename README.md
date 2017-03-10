# Boilerplate for freeCodeCamp’s dynamic web application projects

This project provides a simple setup for building full stack applications in ES6. 

The backend is an API server built with [Express](http://expressjs.com/) that allows the client to access data and authenticate through api calls. [Passport](http://passportjs.org/) is used for authentication with third parties and [JSON Web Tokens](https://jwt.io/) for client to server authentication. [mongoose](http://mongoosejs.com/) is used to interact with a [MongoDB](https://www.mongodb.com/) database. 

The frontend is a single page application built using [ReactJS](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).

### Motivation

As of writing this freeCodeCamp suggests using Clementinejs for building the dynamic web application projects. I wanted to use react on the front end and es6 throughout so I created this boilerplate to achieve that goal.

## Installation

#### .env file

Create a ```.env``` file in the top level directory and add the following to it

```
GITHUB_KEY=
GITHUB_SECRET=
MONGO_URI=
PORT=8080
APP_URL=http://localhost:8080/
JWT_SECRET=
```
Create a github app for authentication. 
* For the homepage URL paste ```http://localhost:8080/```
* For the Authorization callback URL paste ```http://localhost:8080/auth/github/callback```

GitHub will create an app and present you with a Client ID and a Client Secret which you add to to the .env file as the ```GITHUB_KEY``` and ```GITHUB_SECRET``` respectively. 

For the ```MONGO_URI``` install mongodb locally and add the local URI or use something like [mLab](https://mlab.com/)

Add a secret string to the ```JWT_SECRET```

Change the ```userStorageString``` and ```tokenStorageString``` variables in ```client/util/localStorage.js``` to a custom value. Otherwise any other versions of this project will overwrite your local storage saves.

#### Installing Packages

You must have Nodejs installed on your machine. 

* Open the main directory in a terminal and ```npm install```
*  Start the project ```npm run server```

##### For Development

* Run ```npm run client```
* Open another terminal window, ```npm run server```

When changes are made to the client webpack will re-transpile the files and when changes are made to the server nodemon will re-transpile the files.


## License

[MIT](https://opensource.org/licenses/MIT)