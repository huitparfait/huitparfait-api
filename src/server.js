'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const config = require('./config/config');

const server = Hapi.server({
  port: config.get('PORT'),
});

const init = async () => {
  try {
    await server.start();

    server.route(routes);

    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (e) {
    console.log('Failed to start server', e);
  }
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
