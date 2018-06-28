'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      // France - Argentina
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: '9e2517fe-aa14-41e2-bd37-aafdce007588' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }, { team_id: '9e2517fe-aa14-41e2-bd37-aafdce007588' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '259ba25a-659f-4576-84e5-4d4a430d244f' }, { team_id: 'f36ceba0-1d2b-42bc-9abc-f7bab9004b68' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '259ba25a-659f-4576-84e5-4d4a430d244f' }, { team_id: 'f36ceba0-1d2b-42bc-9abc-f7bab9004b68' }))
      // Uruguay - Portugal
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }, { team_id: '24e542de-7b39-4139-a86c-82bf198767a9' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }, { team_id: '24e542de-7b39-4139-a86c-82bf198767a9' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '4323c217-0926-4cb2-af62-99315ea559eb' }, { team_id: 'd02bfe8d-56e3-4a14-9f78-d63667ee9660' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '4323c217-0926-4cb2-af62-99315ea559eb' }, { team_id: 'd02bfe8d-56e3-4a14-9f78-d63667ee9660' }))
      // Spain - Russia
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0413d2f0-2a21-4a9f-934f-614c3ab05efe' }, { team_id: 'fec656dc-4038-441a-8b1d-8beb8207d3f1' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0413d2f0-2a21-4a9f-934f-614c3ab05efe' }, { team_id: 'fec656dc-4038-441a-8b1d-8beb8207d3f1' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }, { team_id: '2f6dc6be-b688-483c-8837-ebd343d3e1ab' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }, { team_id: '2f6dc6be-b688-483c-8837-ebd343d3e1ab' }))
      // Croatia - Denmark
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: '8d79fb69-3323-495e-882c-cc49defefa4d' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }, { team_id: '8d79fb69-3323-495e-882c-cc49defefa4d' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'dba72c01-c592-480b-8bdb-37989195f3ea' }, { team_id: '97aacc9c-5295-4c7c-b689-fbc27cf80612' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'dba72c01-c592-480b-8bdb-37989195f3ea' }, { team_id: '97aacc9c-5295-4c7c-b689-fbc27cf80612' }))
      // Brazil - Mexico
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }, { team_id: 'ad67b5ec-70b1-4409-be3a-381578ef5b69' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }, { team_id: 'ad67b5ec-70b1-4409-be3a-381578ef5b69' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '40335e9b-d842-4325-a149-7aafec49c00b' }, { team_id: '7aa8663d-ac64-4998-932a-5e32a3d11b77' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '40335e9b-d842-4325-a149-7aafec49c00b' }, { team_id: '7aa8663d-ac64-4998-932a-5e32a3d11b77' }))
      // Belgium - Japan
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: '97d105a6-e7fb-4f74-a8df-84c096cc8ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }, { team_id: '97d105a6-e7fb-4f74-a8df-84c096cc8ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '3f42fcdb-adff-44a7-8faa-168a20bce2d7' }, { team_id: '1ea2647a-b2f9-42bc-ab93-d25926ac5ee3' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '3f42fcdb-adff-44a7-8faa-168a20bce2d7' }, { team_id: '1ea2647a-b2f9-42bc-ab93-d25926ac5ee3' }))
      // Sweden - Switzerland
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }, { team_id: 'b1f524b3-f609-4874-8e22-ffa0d4edfd43' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }, { team_id: 'b1f524b3-f609-4874-8e22-ffa0d4edfd43' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'ccaf3f35-ee63-4d5f-b2eb-eacae869383b' }, { team_id: '22b805b2-f31d-48f3-aac0-c8a73ec271af' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'ccaf3f35-ee63-4d5f-b2eb-eacae869383b' }, { team_id: '22b805b2-f31d-48f3-aac0-c8a73ec271af' }))
      // Columbia - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'd7c1a304-0a5d-41e9-a4ea-9ce54be8b47b' }, { team_id: '8e47bdd7-2178-4134-bcfc-c9c332ef2d6c' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'd7c1a304-0a5d-41e9-a4ea-9ce54be8b47b' }, { team_id: '8e47bdd7-2178-4134-bcfc-c9c332ef2d6c' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: '01df6754-12cd-4a8f-bda6-378b876bc2c5' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }, { team_id: '01df6754-12cd-4a8f-bda6-378b876bc2c5' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
    // France - Argentina
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '9e2517fe-aa14-41e2-bd37-aafdce007588' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '9e2517fe-aa14-41e2-bd37-aafdce007588' }, { team_id: '0cb54824-d2b9-4e5a-b57c-63e854ab2210' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'f36ceba0-1d2b-42bc-9abc-f7bab9004b68' }, { team_id: '259ba25a-659f-4576-84e5-4d4a430d244f' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'f36ceba0-1d2b-42bc-9abc-f7bab9004b68' }, { team_id: '259ba25a-659f-4576-84e5-4d4a430d244f' }))
      // Uruguay - Portugal
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '24e542de-7b39-4139-a86c-82bf198767a9' }, { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '24e542de-7b39-4139-a86c-82bf198767a9' }, { team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'd02bfe8d-56e3-4a14-9f78-d63667ee9660' }, { team_id: '4323c217-0926-4cb2-af62-99315ea559eb' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'd02bfe8d-56e3-4a14-9f78-d63667ee9660' }, { team_id: '4323c217-0926-4cb2-af62-99315ea559eb' }))
      // Spain - Russia
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'fec656dc-4038-441a-8b1d-8beb8207d3f1' }, { team_id: '0413d2f0-2a21-4a9f-934f-614c3ab05efe' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'fec656dc-4038-441a-8b1d-8beb8207d3f1' }, { team_id: '0413d2f0-2a21-4a9f-934f-614c3ab05efe' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '2f6dc6be-b688-483c-8837-ebd343d3e1ab' }, { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '2f6dc6be-b688-483c-8837-ebd343d3e1ab' }, { team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c' }))
      // Croatia - Denmark
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '8d79fb69-3323-495e-882c-cc49defefa4d' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '8d79fb69-3323-495e-882c-cc49defefa4d' }, { team_id: '413291cc-3738-45f7-8c39-9675ead70961' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '97aacc9c-5295-4c7c-b689-fbc27cf80612' }, { team_id: 'dba72c01-c592-480b-8bdb-37989195f3ea' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '97aacc9c-5295-4c7c-b689-fbc27cf80612' }, { team_id: 'dba72c01-c592-480b-8bdb-37989195f3ea' }))
      // Brazil - Mexico
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'ad67b5ec-70b1-4409-be3a-381578ef5b69' }, { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'ad67b5ec-70b1-4409-be3a-381578ef5b69' }, { team_id: 'd00ade9e-fc66-4001-af48-e06afec1653d' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '7aa8663d-ac64-4998-932a-5e32a3d11b77' }, { team_id: '40335e9b-d842-4325-a149-7aafec49c00b' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '7aa8663d-ac64-4998-932a-5e32a3d11b77' }, { team_id: '40335e9b-d842-4325-a149-7aafec49c00b' }))
      // Belgium - Japan
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '97d105a6-e7fb-4f74-a8df-84c096cc8ebe' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '97d105a6-e7fb-4f74-a8df-84c096cc8ebe' }, { team_id: '737e5626-48ae-4d08-b519-1845df059ebe' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '1ea2647a-b2f9-42bc-ab93-d25926ac5ee3' }, { team_id: '3f42fcdb-adff-44a7-8faa-168a20bce2d7' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '1ea2647a-b2f9-42bc-ab93-d25926ac5ee3' }, { team_id: '3f42fcdb-adff-44a7-8faa-168a20bce2d7' }))
      // Sweden - Switzerland
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: 'b1f524b3-f609-4874-8e22-ffa0d4edfd43' }, { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: 'b1f524b3-f609-4874-8e22-ffa0d4edfd43' }, { team_id: 'df4c5f73-1be9-4bdf-a053-824a53975f16' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '22b805b2-f31d-48f3-aac0-c8a73ec271af' }, { team_id: 'ccaf3f35-ee63-4d5f-b2eb-eacae869383b' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '22b805b2-f31d-48f3-aac0-c8a73ec271af' }, { team_id: 'ccaf3f35-ee63-4d5f-b2eb-eacae869383b' }))
      // Columbia - England
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '97d105a6-e7fb-4f74-a8df-84c096cc8ebe' }, { team_id: 'd7c1a304-0a5d-41e9-a4ea-9ce54be8b47b' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '97d105a6-e7fb-4f74-a8df-84c096cc8ebe' }, { team_id: 'd7c1a304-0a5d-41e9-a4ea-9ce54be8b47b' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game', { team_id: '1ea2647a-b2f9-42bc-ab93-d25926ac5ee3' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
      .then(() => queryInterface.bulkUpdate('hp_prediction_predicts_score_for_team', { team_id: '1ea2647a-b2f9-42bc-ab93-d25926ac5ee3' }, { team_id: '7fcc4066-51ac-4fb7-9542-5925933740d7' }))
  },
};
