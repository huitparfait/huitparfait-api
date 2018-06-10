'use strict';

const Boom = require('boom');
const DatabaseNotFoundError = require('../database-pool').DatabaseNotFoundError;

module.exports = function (request) {
  return function (e) {
    if (e instanceof DatabaseNotFoundError) {
      return Boom.notFound(e.message, request.params);
    }
    throw e;
  };
};
