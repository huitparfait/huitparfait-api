'use strict';

const hapiAuthJwt2 = require('hapi-auth-jwt2');

const config = require('../config/config');


function validate(decoded) {

  // This should be enough to validate that the id is a UUID without any lib or regex involved
  const UUID_LENGTH = 36;
  if (decoded.id.length === UUID_LENGTH) {
    return { isValid: true };
  }
  return { isValid: false };
};

function validateAnonymous() {
  return { isValid: true };
};

module.exports = {
  name: 'huitparfaitAuth',
  register: async function (server) {

    await server.register(hapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
      key: config.get('JWT_PUBLIC_KEY'),
      validate: validate,
      verifyOptions: { algorithms: ['RS512'] }
    });

    server.auth.strategy('jwt-anonymous', 'jwt', {
      key: config.get('JWT_PUBLIC_KEY'),
      validate: validateAnonymous,
      verifyOptions: { algorithms: ['RS512'] }
    });

    server.auth.default('jwt');

  },
};
