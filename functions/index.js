const functions = require('firebase-functions');
const axios = require('axios').default;
const api = require('./api');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send('Hello from Firebase!');
});

exports.subscribe = functions.https.onRequest((req, res) => {
  // parse the origin and decide if its allowed
  const allowedOrigins = [
    // local dev
    'http://localhost:3000',
    // Firebase staging
    'https://transunited.web.app',
    'https://transunited.firebaseapp.com',
    // Prod
    'https://transunited.lgbt'
  ];
  if (allowedOrigins.includes(req.headers.origin)) {
    console.log(`Origin ${req.headers.origin} allowed`);
    // set the allow-origin header if this origin is allowed
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    console.log(`Origin ${req.headers.origin} blocked`);
  }
  // add other response headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  const mailchimp = 'https://us4.api.mailchimp.com/3.0';
  const mailchimpConfig = functions.config().mailchimp;
  const listId = mailchimpConfig.listid;
  const apiKey = mailchimpConfig.key;
  const path = `${mailchimp}/lists/${listId}/members`;
  const body = req.body;
  const data = {
    email_address: body.email,
    status: 'subscribed',
    merge_fields: {
      "FNAME": body.firstName,
      "LNAME": body.lastName
    }
  }
  axios.post(path, JSON.stringify(data), {
    auth: {
      username: 'none',
      password: apiKey
    }
  }).then(response => {
    res.send({
      statusCode: 200,
      data: response.data
    });
  }).catch(err => {
    let statusCode;
    if (err.response.status === 400) {
      statusCode = 409;
    } else {
      statusCode = err.response.status;
    }
    res.send({
      statusCode,
      error: err
    });
  });
});

exports.api = functions.https.onRequest(api);