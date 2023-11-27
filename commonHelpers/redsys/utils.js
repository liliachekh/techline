
const base64url = require('base64url');

function encodeBase64url(obj) {
  const jsonString = JSON.stringify(obj);
  const base64urlEncoded = base64url(jsonString);

  return base64urlEncoded;
}

function decodeBase64url(encodedString) {
  const jsonString = base64url.decode(encodedString);
  const decodedObj = JSON.parse(jsonString);

  return decodedObj;
}

module.exports = { encodeBase64url, decodeBase64url };