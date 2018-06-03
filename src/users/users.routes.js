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

  {
    method: 'GET',
    path: '/api/users/me/groups',
    handler: function (request) {
      return userService.getUserGroups(request.auth.credentials.id);
    },
  },

];
