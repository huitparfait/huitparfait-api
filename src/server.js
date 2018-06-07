'use strict';

const config = require('./config/config');
const groupRoutes = require('./groups/groups.routes');
const Hapi = require('hapi');
const homeRoutes = require('./home.routes');
const jwtAuth = require('./auth/jwt.auth');
const rankingRoutes = require('./rankings/rankings.routes');
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
    rankingRoutes,
  ]);

  return server;
}

module.exports = { createServer };
