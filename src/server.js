'use strict';

const jwtAuth = require('./auth/jwt.auth');
const config = require('./config/config');
const Hapi = require('hapi');
const routes = require('./routes');
const userRoutes = require('./users/users.routes');

async function createServer () {

  const server = Hapi.server({
    port: config.get('PORT'),
  });

  await server.register(jwtAuth);

  server.route(routes);
  server.route(userRoutes);

  return server;
};

module.exports = { createServer };
