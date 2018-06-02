'use strict';

const userService = require('./users.service.js');

module.exports = [

  {
    method: 'GET',
    path: '/api/users/{id}',
    handler: function (request) {
      return userService.getUser(request.params.id)
    },
  },

];
