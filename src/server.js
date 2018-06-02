'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const config = require('./config/config.js');

async function createServer () {
  const server = Hapi.server({
    port: config.get('PORT'),
  });
  server.route(routes);
  return server;
};

module.exports = { createServer };
