'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.changeColumn('hp_prediction', 'risk_will_happen', { allowNull: true, type: Sequelize.BOOLEAN }));
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.changeColumn('hp_prediction', 'risk_will_happen', { allowNull: false, type: Sequelize.BOOLEAN }));
  },
};
