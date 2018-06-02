'use strict'

const Sequelize = require('sequelize')

// https://github.com/sequelize/sequelize/issues/4679

module.exports = {
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.fn('uuid_generate_v4'),
  },
  date: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
  },
  foreignKey (tableName, primaryKey = true) {
    return {
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey,
      references: { model: tableName, key: 'id' },
    }
  },
}
