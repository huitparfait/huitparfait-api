'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // France - Belgium
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: 'a3e4bb89-72da-491d-988b-30b39bb8ee9d' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: 'a3e4bb89-72da-491d-988b-30b39bb8ee9d' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: '2eaef041-3460-4e97-9364-2a6b83d7844a' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: '2eaef041-3460-4e97-9364-2a6b83d7844a' }))
      // Croatia - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: 'e7b9d5bd-5078-4225-8a0a-c31753d66cf0' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: 'e7b9d5bd-5078-4225-8a0a-c31753d66cf0' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: '5117feb0-9c4e-43b8-9cc7-92f108f82e54' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: '5117feb0-9c4e-43b8-9cc7-92f108f82e54' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // France - Belgium
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'a3e4bb89-72da-491d-988b-30b39bb8ee9d' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'a3e4bb89-72da-491d-988b-30b39bb8ee9d' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '2eaef041-3460-4e97-9364-2a6b83d7844a' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '2eaef041-3460-4e97-9364-2a6b83d7844a' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      // Croatia - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'e7b9d5bd-5078-4225-8a0a-c31753d66cf0' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'e7b9d5bd-5078-4225-8a0a-c31753d66cf0' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '5117feb0-9c4e-43b8-9cc7-92f108f82e54' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '5117feb0-9c4e-43b8-9cc7-92f108f82e54' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
  },
};
