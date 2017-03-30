# A Nightlife Coordination App build for freeCodeCamp

Built using ES6, [React](https://facebook.github.io/react/) [Redux](http://redux.js.org/) front end, [Express](https://expressjs.com/) for back end and [mongodb](https://www.mongodb.com/) through [mongoose](http://mongoosejs.com/) for data storage.

[Yelp API](https://www.yelp.com/developers) used for data

## Installation

### .env file

Create a ```.env``` file in the top level directory and add the following to it

```
GITHUB_KEY=
GITHUB_SECRET=
YELP_KEY=
YELP_SECRET=
MONGO_URI=
PORT=8080
APP_URL=http://localhost:8080/
JWT_SECRET=
```

* Create a github app for authentication and plug in the key and secret
* Create a app for the yelp api and plug in the key and secret key
* Install mongodb locally and add the local URI or use something like [mLab](https://mlab.com/)
* Add a secret string to ```JWT_SECRET```

### Other required alterations

* Change appUrl in ```client/src/util/constants.js``` to ```http://localhost:8080/``` or whatever your url will be.


* Change the ```userStorageString``` and ```tokenStorageString``` variables in ```client/util/localStorage.js``` to a custom value. Otherwise any other versions of this project will overwrite your local storage saves.

### Running

You must have Nodejs installed on your machine.

* ```npm install```
* ```npm start```

## License

[MIT](https://opensource.org/licenses/MIT)