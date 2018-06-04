'use strict';

module.exports = {
  name: 'home.routes',
  async register (server, options) {

    server.route({
      method: 'GET',
      path: '/',
      config: { auth: false },
      handler () {
        return 'OK';
      },
    });
  },
};
