const axios = require('axios');

// Serverless function that subscribes an email address to the MailChimp mailing list
exports.handler = (event, context, callback) => {
  const apiKey = process.env.APIKEY;
  console.log(apiKey);
}