'use strict';

const defaultErrorHandling = require('../utils/default-error-handling');
const groupService = require('./groups.service');
const Joi = require('joi');

module.exports = {
  name: 'groups.routes',
  async register (server, options) {

    server.route([

      {
        method: 'POST',
        path: '/api/groups',
        config: {
          validate: {
            payload: Joi.object({
              name: Joi.string().required(),
              avatarUrl: Joi.string().uri({ scheme: 'https' }),
            }).required(),
          },
        },
        handler (request) {
          return groupService.createGroup(request.auth.credentials.sub, {
            name: request.payload.name,
            avatarUrl: request.payload.avatarUrl,
          });
        },
      },

      {
        method: 'GET',
        path: '/api/groups/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string().uuid(),
            },
          },
        },
        handler (request) {
          return groupService
            .getGroup(request.auth.credentials.sub, request.params.id)
            .catch(defaultErrorHandling(request));
        },
      },

      {
        method: 'PUT',
        path: '/api/groups/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string().uuid(),
            },
            payload: Joi.object({
              name: Joi.string().required(),
              avatarUrl: Joi.string().uri({ scheme: 'https' }),
            }).required(),
          },
        },
        handler (request) {
          return groupService
            .updateGroup(request.auth.credentials.sub, request.params.id, {
              name: request.payload.name,
              avatarUrl: request.payload.avatarUrl,
            })
            .catch(defaultErrorHandling(request));
        },
      },

      {
        method: 'DELETE',
        path: '/api/groups/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string().uuid(),
            },
          },
        },
        handler (request, h) {
          return groupService
            .deleteGroup(request.auth.credentials.sub, request.params.id)
            .then(() => h.response().code(204))
            .catch(defaultErrorHandling(request));
        },
      },

    ]);
  },
};
