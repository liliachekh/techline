
const base64url = require('base64url');

function encodeBase64url(obj) {
  const jsonString = JSON.stringify(obj);
  const base64urlEncoded = base64url(jsonString);

  return base64urlEncoded;
}

module.exports = {encodeBase64url}