'use strict';

const Boom = require('boom');
const Joi = require('joi');
const scoresService = require('./scores.service');

module.exports = {
  name: 'scores.routes',
  async register (server, options) {

    server.route([

      {
        method: 'PUT',
        path: '/api/games/{gameId}/scores',
        config: {
          auth: 'jwt-admin',
          validate: {
            params: {
              gameId: Joi.string().uuid(),
            },
            payload: Joi.object({
              goalsTeamA: Joi.number().integer().min(0).required(),
              goalsTeamB: Joi.number().integer().min(0).required(),
              penaltiesTeamA: Joi.number().integer().min(0),
              penaltiesTeamB: Joi.number().integer().min(0),
              riskHappened: Joi.boolean().required(),
            }).required(),
          },
        },
        handler (request) {
          // Second parachute to prevent any changes in the route's auth config
          if (request.auth.credentials.isAdmin !== true) {
            return Boom.unauthorized();
          }

          const { gameId } = request.params;
          const { riskHappened, goalsTeamA, goalsTeamB, penaltiesTeamA, penaltiesTeamB } = request.payload;
          return scoresService.updateScores({
            gameId,
            riskHappened,
            goalsTeamA,
            goalsTeamB,
            penaltiesTeamA,
            penaltiesTeamB,
          });
        },
      },

    ]);
  },
};
