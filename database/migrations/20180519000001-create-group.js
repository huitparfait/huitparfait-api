'use strict'

const { uuid, date } = require('../lib/migrations-lib')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.createTable('hp_group', {
        id: uuid,
        created_at: date,
        updated_at: date,
        name: { allowNull: false, type: Sequelize.STRING },
        avatar_url: { type: Sequelize.STRING },
      }))
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.dropTable('hp_group'))
  },
}
