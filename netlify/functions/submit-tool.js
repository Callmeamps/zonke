const { handleToolSubmit } = require('../../lib/handleToolSubmit');

module.exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const result = await handleToolSubmit(body);

  if (result.headers) {
    result.headers['Access-Control-Allow-Origin'] = '*';
  } else {
    result.headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  }

  return result;
};
