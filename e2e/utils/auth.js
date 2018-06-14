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

let adminToken;
function getAdminToken () {
  // Admin token (for score updates and other admin tasks)
  adminToken = adminToken || sign({ isAdmin: true });
  return adminToken;
}

let johnsToken;
function getJohnsToken () {
  // Token for john Lennon (from the test data set)
  johnsToken = johnsToken || sign({ sub: '15c336ea-091b-425a-a99b-190179623ad4' });
  return johnsToken;
}

let micksToken;
function getMicksToken () {
  // Token for mick Jagger (from the test data set)
  micksToken = micksToken || sign({ sub: '7681a3ad-24d2-44c4-a73a-2b8f0da16084' });
  return micksToken;
}

module.exports = {
  getAnonymousToken,
  getAdminToken,
  getJohnsToken,
  getMicksToken,
};
