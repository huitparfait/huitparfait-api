'use strict';

const { uuid, date } = require('../lib/migrations-lib');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.createTable('hp_risk', {
        id: uuid,
        created_at: date,
        updated_at: date,
        text: { allowNull: false, type: Sequelize.STRING(300) },
      }));
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.dropTable('hp_risk'));
  },
};
