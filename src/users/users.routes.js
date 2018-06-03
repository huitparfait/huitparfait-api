'use strict';

const Joi = require('joi');

const userService = require('./users.service.js');

module.exports = [

  {
    method: 'POST',
    path: '/api/users/me',
    config: {
      auth: 'jwt-anonymous',
      validate: {
        payload: Joi.object({
          oauthHash: Joi.string().required(),
          name: Joi.string(),
          avatarUrl: Joi.string().uri({ scheme: 'https' }),
        }).required(),
      }
    },
    handler: function (request) {
      return userService.connectUser({
        oauthHash: request.payload.oauthHash,
        name: request.payload.name,
        avatarUrl: request.payload.avatarUrl,
      });
    },
  },

  {
    method: 'GET',
    path: '/api/users/me',
    handler: function (request) {
      return userService.getUser(request.auth.credentials.id);
    },
  },

  {
    method: 'PUT',
    path: '/api/users/me',
    config: {
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          avatarUrl: Joi.string().uri({ scheme: 'https' }),
          isAnonymous: Joi.boolean(),
        }).required(),
      }
    },
    handler: function (request) {
      return userService.updateUser({
        id: request.auth.credentials.id,
        name: request.payload.name,
        avatarUrl: request.payload.avatarUrl,
        isAnonymous: request.payload.isAnonymous,
      });
    },
  },

  {
    method: 'GET',
    path: '/api/users/me/groups',
    handler: function (request) {
      return userService.getUserGroups(request.auth.credentials.id);
    },
  },

];
