'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.addColumn('hp_game', 'risk_happened', { type: Sequelize.BOOLEAN }));
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.removeColumn('hp_game', 'risk_happened'));
  },
};
