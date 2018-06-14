'use strict';

const Boom = require('boom');
const pointService = require('./points.service');
const { getEightLimit } = require('../utils/date.utils');

module.exports = {
  name: 'points.routes',
  async register (server, options) {

    server.route([

      {
        method: 'POST',
        path: '/api/prediction-points/compute',
        config: {
          auth: 'jwt-admin',
        },
        async handler (request) {
          // Second parachute to prevent any changes in the route's auth config
          if (request.auth.credentials.isAdmin !== true) {
            return Boom.unauthorized();
          }

          const eightLimit = getEightLimit();
          const predictions = await pointService.getPredictionsToCompute(eightLimit);
          const predictionsWithPoints = pointService.computeManyPredictionPoints(predictions);
          await pointService.updateManyPredictionPoints(predictionsWithPoints);
          return predictionsWithPoints;
        },
      },

    ]);
  },
};
