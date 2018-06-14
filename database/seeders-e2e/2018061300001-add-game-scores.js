'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkUpdate('hp_game',
        { risk_happened: true },
        { id: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 3 },
        { game_id: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25', order: 1 }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 1 },
        { game_id: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25', order: 2 }))
      //
      .then(() => queryInterface.bulkUpdate('hp_game',
        { risk_happened: true },
        { id: '84b35ca0-264e-4c0d-b722-bde0f0a2114a' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 0 },
        { game_id: '84b35ca0-264e-4c0d-b722-bde0f0a2114a', order: 1 }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 0 },
        { game_id: '84b35ca0-264e-4c0d-b722-bde0f0a2114a', order: 2 }))
      //
      .then(() => queryInterface.bulkUpdate('hp_game',
        { risk_happened: false },
        { id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 1 },
        { game_id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f', order: 1 }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 2 },
        { game_id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f', order: 2 }))
      //
      .then(() => queryInterface.bulkUpdate('hp_game',
        { risk_happened: false },
        { id: 'e1d3e363-6794-4f07-bd41-5566e5a5d6b8' }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 5 },
        { game_id: 'e1d3e363-6794-4f07-bd41-5566e5a5d6b8', order: 1 }))
      .then(() => queryInterface.bulkUpdate('hp_team_plays_in_game',
        { goals: 7 },
        { game_id: 'e1d3e363-6794-4f07-bd41-5566e5a5d6b8', order: 2 }));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  },
};
