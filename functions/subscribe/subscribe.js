const axios = require('axios').default;

// Serverless function that subscribes an email address to the MailChimp mailing list
exports.handler = (event, context, callback) => {
  // handle OPTIONS requests - should enable CORS
  console.log(event.httpMethod);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };
  if (event.httpMethod === 'OPTIONS') {
    callback(null, {
      statusCode: 200,
      headers,
      body: 'Preflight'
    });
    return {
      statusCode: 200,
      headers,
      body: 'Preflight'
    }
  }

  const mailchimp = 'https://us4.api.mailchimp.com/3.0';
  const apiKey = process.env.APIKEY;
  const listId = process.env.LISTID;
  const path = `${mailchimp}/lists/${listId}/members`;
  const eventBody = JSON.parse(event.body);
  const email = eventBody.email;
  const firstName = eventBody.firstName;
  const lastName = eventBody.lastName;
  if (!email) {
    // send an error if no email is found
    callback({error: 'Email not found'}, {headers});
  }
  // build an object to send with the post request
  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      "FNAME": firstName,
      "LNAME": lastName
    }
  };
  // send post request to api
  axios.post(path, JSON.stringify(data), {
    auth: {
      username: 'none',
      password: apiKey
    }
  }).then(res => {
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({data: res.data})
    });
  }).catch(err => {
    let statusCode;
    if (err.response.status === 400) {
      statusCode = 409;
    } else {
      statusCode = err.response.status;
    }
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({error: err})
    });
  });
}