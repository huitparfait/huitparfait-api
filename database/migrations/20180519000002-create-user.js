'use strict';

const { uuid, date, foreignKey } = require('../lib/migrations-lib');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.createTable('hp_user', {
        id: uuid,
        created_at: date,
        updated_at: date,
        oauth_hash: { allowNull: false, type: Sequelize.STRING(200), unique: true },
        name: { allowNull: false, type: Sequelize.STRING(80) },
        anonymous_name: { allowNull: false, type: Sequelize.STRING(80) },
        avatar_url: { type: Sequelize.STRING(200) },
        is_anonymous: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
        last_connection_at: date,
      }))
      .then(() => queryInterface.createTable('hp_user_in_group', {
        user_id: foreignKey('hp_user'),
        group_id: foreignKey('hp_group'),
        is_admin: { allowNull: false, type: Sequelize.BOOLEAN },
        is_active: { allowNull: false, type: Sequelize.BOOLEAN },
        created_at: date,
        updated_at: date,
      }));
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.dropTable('hp_user_in_group'))
      .then(() => queryInterface.dropTable('hp_user'));
  },
};
