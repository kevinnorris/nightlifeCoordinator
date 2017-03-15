import 'es6-promise/auto';
import 'isomorphic-fetch';

// yelp access token
const yelpAccessToken = {
  token: '',
  expireDate: null,
};

// Config for yelp access token request form body
const yelpDetails = {
  grant_type: 'client_credentials',
  client_id: process.env.YELP_KEY,
  client_secret: process.env.YELP_SECRET,
};

// Request yelp access token
const getYelpAccessToken = (callback) => {
  const formBody = Object.keys(yelpDetails)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(yelpDetails[key]))
  .join('&');

  fetch('https://api.yelp.com/oauth2/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  }).then(response => response.json())
  .then((json) => {
    // Save access token
    yelpAccessToken.token = json.access_token;
    // Save experation date
    yelpAccessToken.expireDate = new Date(Date.now() + json.expires_in);

    callback(yelpAccessToken.token);
  }).catch(err => console.log('error:', err));
};

// Returns the access token
export default (callback) => {
  // If none exists or it will expire in less than 5 min, get new access token
  if (!yelpAccessToken.token || Date.now() > (yelpAccessToken.expireDate.getTime() - 300000)) {
    getYelpAccessToken((token) => {
      callback(token);
    });
  } else {
    callback(yelpAccessToken.token);
  }
};
