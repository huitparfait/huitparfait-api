'use strict';

const groupService = require('./groups.service');

module.exports = {
  name: 'groups.routes',
  async register (server, options) {

    server.route([

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
          return groupService.getGroup(request.auth.credentials.id, request.params.id);
        },
      },

    ]);
  },
};
