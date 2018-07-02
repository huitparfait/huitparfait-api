'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // Brazil - Belgium
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }, { team_id: '6f8ac5e3-30bf-44e2-962b-2c9b21b32cb7' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }, { team_id: '6f8ac5e3-30bf-44e2-962b-2c9b21b32cb7' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: 'e509f167-735e-4bb1-865b-662240e16cc2' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: 'e509f167-735e-4bb1-865b-662240e16cc2' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
    // Brazil - Belgium
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '6f8ac5e3-30bf-44e2-962b-2c9b21b32cb7' }, { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '6f8ac5e3-30bf-44e2-962b-2c9b21b32cb7' }, { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'e509f167-735e-4bb1-865b-662240e16cc2' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'e509f167-735e-4bb1-865b-662240e16cc2' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
  },
};
