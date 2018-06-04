'use strict';

const config = require('../config/config');
const hapiAuthJwt2 = require('hapi-auth-jwt2');

module.exports = {
  name: 'jwt.auth',
  async register (server) {

    await server.register(hapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
      key: config.get('JWT_PUBLIC_KEY'),
      validate: validateToken,
      verifyOptions: { algorithms: ['RS512'] },
    });

    server.auth.strategy('jwt-anonymous', 'jwt', {
      key: config.get('JWT_PUBLIC_KEY'),
      validate: validateAnonymousToken,
      verifyOptions: { algorithms: ['RS512'] },
    });

    server.auth.default('jwt');
  },
};

function validateToken (decoded) {
  // This should be enough to validate that the id is a UUID without any lib or regex involved
  const UUID_LENGTH = 36;
  const isValid = (decoded.id.length === UUID_LENGTH);
  return { isValid };
};

function validateAnonymousToken () {
  return { isValid: true };
};
