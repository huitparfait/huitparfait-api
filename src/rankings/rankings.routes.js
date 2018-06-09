'use strict';

const defaultErrorHandling = require('../utils/default-error-handling');
const Joi = require('joi');
const rankingService = require('./rankings.service');

module.exports = {
  name: 'rankings.routes',
  async register (server, options) {

    server.route([

      {
        method: 'GET',
        path: '/api/rankings/{groupId}',
        config: {
          description: 'Fetch ranking',
          tags: ['api'],
          validate: {
            query: {
              page: Joi.number().integer().min(1).default(1),
              pageSize: Joi.number().integer().min(0).default(20),
            },
          },
          handler (request) {
            const userId = request.auth.credentials.sub;
            const groupId = request.params.groupId;
            const { page, pageSize } = request.query;

            if (groupId === 'general') {
              return rankingService.calculateGeneralRanking({ userId, page, pageSize })
                .catch(defaultErrorHandling(request));
            }

            return rankingService.calculateGroupRanking({ userId, groupId, page, pageSize })
              .catch(defaultErrorHandling(request));
          },
        },
      },

    ]);
  },
};
