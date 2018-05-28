'use strict'

// https://github.com/sequelize/sequelize/issues/4679

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.sequelize.query(`DROP EXTENSION "uuid-ossp";`)
  },
}
