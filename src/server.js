'use strict';

const config = require('./config/config');
const Good = require('good');
const groupRoutes = require('./groups/groups.routes');
const Hapi = require('hapi');
const homeRoutes = require('./home.routes');
const jwtAuth = require('./auth/jwt.auth');
const pointRoutes = require('./points/points.routes');
const rankingRoutes = require('./rankings/rankings.routes');
const scoreRoutes = require('./scores/scores.routes');
const userRoutes = require('./users/users.routes');

async function createServer () {

  const server = Hapi.server({
    port: config.get('PORT'),
  });

  await server.register([
    jwtAuth,
    homeRoutes,
    userRoutes,
    groupRoutes,
    pointRoutes,
    rankingRoutes,
    scoreRoutes,
    {
      plugin: Good,
      options: {
        ops: {
          interval: 1000,
        },
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', error: '*' }],
            },
            {
              module: 'good-console',
            },
            'stdout',
          ],
        },
      },
    },
  ]);

  return server;
}

module.exports = { createServer };
