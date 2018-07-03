'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // Sweden - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }, { team_id: '7094a9c2-8acc-40cf-bff6-43fc2bcf2c70' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }, { team_id: '7094a9c2-8acc-40cf-bff6-43fc2bcf2c70' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: 'cf5600fa-e9bc-49e7-9880-06fa24d31d73' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: 'cf5600fa-e9bc-49e7-9880-06fa24d31d73' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // Sweden - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '7094a9c2-8acc-40cf-bff6-43fc2bcf2c70' }, { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '7094a9c2-8acc-40cf-bff6-43fc2bcf2c70' }, { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'cf5600fa-e9bc-49e7-9880-06fa24d31d73' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'cf5600fa-e9bc-49e7-9880-06fa24d31d73' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
  },
};
