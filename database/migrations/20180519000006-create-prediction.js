'use strict';

const { uuid, date, foreignKey } = require('../lib/migrations-lib');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.createTable('hp_prediction', {
        id: uuid,
        created_at: date,
        updated_at: date,
        risk_will_happen: { allowNull: false, type: Sequelize.BOOLEAN },
        risk_amount: { allowNull: false, type: Sequelize.INTEGER },
        points_classic: { type: Sequelize.INTEGER },
        points_risk: { type: Sequelize.INTEGER },
        user_id: foreignKey('hp_user', false),
        game_id: foreignKey('hp_game', false),
        risk_id: foreignKey('hp_risk', false),
      }))
      .then(() => queryInterface.addIndex('hp_prediction', {
        fields: ['user_id', 'game_id'],
        unique: true,
      }))
      .then(() => queryInterface.createTable('hp_prediction_predicts_score_for_team', {
        prediction_id: foreignKey('hp_prediction'),
        team_id: foreignKey('hp_team'),
        created_at: date,
        updated_at: date,
        goal: { allowNull: false, type: Sequelize.INTEGER },
      }));
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.dropTable('hp_prediction_predicts_score_for_team'))
      .then(() => queryInterface.dropTable('hp_prediction'));
  },
};
