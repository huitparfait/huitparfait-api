'use strict';

const config = require('./config/config');
const { createServer } = require('./server');

try {
  config.validate({ allowed: 'strict' });
}
catch (error) {
  const configErrorMessages = error.message.split('\n');
  configErrorMessages.forEach((message) => {
    console.error('Bad config -', message);
  });

  // 9 - Invalid Argument
  // https://nodejs.org/api/process.html#process_exit_codes
  console.error('App STOPPED because of configuration errors');
  process.exit(9);
}

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
