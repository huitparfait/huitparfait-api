'use strict';

const config = require('./config/config');
const groupRoutes = require('./groups/groups.routes');
const Hapi = require('hapi');
const homeRoutes = require('./home.routes');
const jwtAuth = require('./auth/jwt.auth');
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
  ]);

  return server;
}

module.exports = { createServer };
