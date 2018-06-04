'use strict';

const Joi = require('joi');
const userService = require('./users.service');

module.exports = {
  name: 'users.routes',
  async register (server, options) {

    server.route([

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
          },
        },
        handler (request) {
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
        handler (request) {
          return userService.getUser(request.auth.credentials.sub);
        },
      },

      {
        method: 'PUT',
        path: '/api/users/me',
        config: {
          validate: {
            payload: Joi.object({
              name: Joi.string(),
              avatarUrl: Joi.string().uri({ scheme: 'https' }),
              isAnonymous: Joi.boolean(),
            }).required(),
          },
        },
        handler (request) {
          return userService.updateUser({
            id: request.auth.credentials.sub,
            name: request.payload.name,
            avatarUrl: request.payload.avatarUrl,
            isAnonymous: request.payload.isAnonymous,
          });
        },
      },

      {
        method: 'GET',
        path: '/api/users/me/groups',
        handler (request) {
          return userService.getUserGroups(request.auth.credentials.sub);
        },
      },

    ]);
  },
};
