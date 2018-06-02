'use strict';

const userService = require('./users.service.js');

module.exports = [

  {
    method: 'GET',
    path: '/api/users/me',
    handler: function (request) {
      return userService.getUser(request.auth.credentials.id);
    },
  },

];
