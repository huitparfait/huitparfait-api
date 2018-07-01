'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // France - Uruguay
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: '6ac9a431-7e13-4896-bcc8-347cd0a162b9' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: '6ac9a431-7e13-4896-bcc8-347cd0a162b9' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }, { team_id: '1e2fc5d0-9523-4213-b378-f3b9834cf782' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }, { team_id: '1e2fc5d0-9523-4213-b378-f3b9834cf782' }))
      // Russia - Croatia
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }, { team_id: 'e8c11f76-cf95-4607-bed9-59d1d2926fc0' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }, { team_id: 'e8c11f76-cf95-4607-bed9-59d1d2926fc0' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: 'c7d2b4d6-e0d5-4346-a181-bb92bc22dab3' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: 'c7d2b4d6-e0d5-4346-a181-bb92bc22dab3' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // France - Uruguay
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '6ac9a431-7e13-4896-bcc8-347cd0a162b9' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '6ac9a431-7e13-4896-bcc8-347cd0a162b9' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '1e2fc5d0-9523-4213-b378-f3b9834cf782' }, { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '1e2fc5d0-9523-4213-b378-f3b9834cf782' }, { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }))
      // Russia - Croatia
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'e8c11f76-cf95-4607-bed9-59d1d2926fc0' }, { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'e8c11f76-cf95-4607-bed9-59d1d2926fc0' }, { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'c7d2b4d6-e0d5-4346-a181-bb92bc22dab3' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'c7d2b4d6-e0d5-4346-a181-bb92bc22dab3' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
  },
};
