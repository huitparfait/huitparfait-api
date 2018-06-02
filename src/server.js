'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const userRoutes = require('./users/users.routes.js');
const config = require('./config/config.js');

async function createServer () {
  const server = Hapi.server({
    port: config.get('PORT'),
  });
  server.route(routes);
  server.route(userRoutes);
  return server;
};

module.exports = { createServer };
