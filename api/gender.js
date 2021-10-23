exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({error: "Can only GET gender."}) };
  }
  const email = event.queryStringParameters?.email;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({error: "No supported query type specified. Supported query types: email."}) };
  }
  return { statusCode: 200, body: JSON.stringify({ email, gender: null }) };
}
