'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // Belgium - Croatia
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: '78289622-099c-4b7e-9c6f-a57f776ef6ce' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: '78289622-099c-4b7e-9c6f-a57f776ef6ce' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: 'fd4f947e-7730-498b-bb4b-abcbfe4854ce' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: 'fd4f947e-7730-498b-bb4b-abcbfe4854ce' }))
      // France - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: 'c2965a1e-be93-49d4-b1f5-b6d757f3ad2e' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: 'c2965a1e-be93-49d4-b1f5-b6d757f3ad2e' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: '21c04a6e-01ae-49e4-b16e-ac53ef5f170e' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: '21c04a6e-01ae-49e4-b16e-ac53ef5f170e' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // Belgium - Croatia
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '78289622-099c-4b7e-9c6f-a57f776ef6ce' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '78289622-099c-4b7e-9c6f-a57f776ef6ce' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'fd4f947e-7730-498b-bb4b-abcbfe4854ce' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'fd4f947e-7730-498b-bb4b-abcbfe4854ce' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
      // France - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'c2965a1e-be93-49d4-b1f5-b6d757f3ad2e' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'c2965a1e-be93-49d4-b1f5-b6d757f3ad2e' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '21c04a6e-01ae-49e4-b16e-ac53ef5f170e' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '21c04a6e-01ae-49e4-b16e-ac53ef5f170e' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
  },
};
