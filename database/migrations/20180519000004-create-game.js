'use strict'

const { uuid, date, foreignKey } = require('../lib/migrations-lib')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hp_game', {
      id: uuid,
      created_at: date,
      updated_at: date,
      name: { allowNull: false, type: Sequelize.STRING(30) },
      phase: { allowNull: false, type: Sequelize.STRING(30) },
      starts_at: { allowNull: false, type: Sequelize.DATE },
      stadium: { allowNull: false, type: Sequelize.STRING(100) },
      city: { allowNull: false, type: Sequelize.STRING(100) },
      risk_id: foreignKey('hp_risk', false),
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('hp_game')
  },
}
