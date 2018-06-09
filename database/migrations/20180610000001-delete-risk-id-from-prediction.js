'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.removeColumn('hp_prediction', 'risk_id'));
  },
  down: (queryInterface, Sequelize) => {
    // Hard to add back lost data
    return Promise.resolve()
      .then(() => queryInterface.addColumn('hp_prediction', 'risk_id', {
        type: Sequelize.DataTypes.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'hp_risk', key: 'id' },
      }));
  },
};
