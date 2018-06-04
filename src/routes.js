'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: { auth: false },
    handler () {
      return 'OK';
    },
  },
];
