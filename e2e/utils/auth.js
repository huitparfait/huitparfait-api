'use strict';

const config = require('../../src/config/config');
const jwt = require('jsonwebtoken');

const JWT_TEST_PRIVATE_KEY = config.get('JWT_TEST_PRIVATE_KEY');

function sign (token) {
  return jwt.sign(token, JWT_TEST_PRIVATE_KEY, { algorithm: 'RS512' });
}

let anonymousToken;
function getAnonymousToken () {
  // Anonymous token (for user creation for instance)
  anonymousToken = anonymousToken || sign({ anonymous: true });
  return anonymousToken;
}

let johnsToken;
function getJohnsToken () {
  // Token for john Lennon (from the test data set)
  johnsToken = johnsToken || sign({ sub: '15c336ea-091b-425a-a99b-190179623ad4' });
  return johnsToken;
}

module.exports = {
  getAnonymousToken,
  getJohnsToken,
};
