'use strict';

const Boom = require('boom');
const DatabaseNotFoundError = require('../database-pool').DatabaseNotFoundError;

module.exports = function (request) {
  return function (e) {
    if (e instanceof DatabaseNotFoundError) {
      return Boom.notFound(`Group ${request.params.id} was not found`);
    }
    throw e;
  };
};
