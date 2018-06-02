'use strict';

const { createServer } = require('./server');

createServer()
  .then(async (server) => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  })
  .catch((e) => console.log('Failed to start server', e));

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
