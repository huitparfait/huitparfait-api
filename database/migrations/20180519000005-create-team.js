'use strict'

const { uuid, date, foreignKey } = require('../lib/migrations-lib')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.createTable('hp_team', {
        id: uuid,
        created_at: date,
        updated_at: date,
        name: { allowNull: false, type: Sequelize.STRING(30) },
        code: { type: Sequelize.STRING(3) },
        group: { type: Sequelize.STRING(1) },
      }))
      .then(() => queryInterface.createTable('hp_team_plays_in_game', {
        team_id: foreignKey('hp_team'),
        game_id: foreignKey('hp_game'),
        created_at: date,
        updated_at: date,
        order: { allowNull: false, type: Sequelize.INTEGER },
        goals: { type: Sequelize.INTEGER },
        penalties: { type: Sequelize.INTEGER },
      }))
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.dropTable('hp_team_plays_in_game'))
      .then(() => queryInterface.dropTable('hp_team'))
  },
}
