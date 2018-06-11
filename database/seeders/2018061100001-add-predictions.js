'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkInsert('hp_prediction', [
        {
          id: '17f2f2aa-fdd0-40ea-bbfa-1c01492bdc0b',
          risk_will_happen: true,
          risk_amount: 3,
          points_classic: 5,
          points_risk: 3,
          user_id: '15c336ea-091b-425a-a99b-190179623ad4',
          game_id: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25',
        },
        {
          id: '20982cf7-13cc-4cfe-931f-3c74751fa9bd',
          risk_will_happen: true,
          risk_amount: 3,
          points_classic: 5,
          points_risk: 3,
          user_id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1',
          game_id: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25',
        },
        {
          id: '02d9fbfc-8f42-4729-a58b-afd43dca0cd5',
          risk_will_happen: false,
          risk_amount: 3,
          points_classic: 0,
          points_risk: -3,
          user_id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          game_id: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25',
        },
        {
          id: 'e873a053-40ed-4639-b7c9-fe10c896e0bf',
          risk_will_happen: true,
          risk_amount: 3,
          points_classic: 5,
          points_risk: 3,
          user_id: '15c336ea-091b-425a-a99b-190179623ad4',
          game_id: '84b35ca0-264e-4c0d-b722-bde0f0a2114a',
        },
        {
          id: '6d25ad9d-a1e0-482b-ad3f-1022db3d80d6',
          risk_will_happen: true,
          risk_amount: 3,
          points_classic: 5,
          points_risk: 3,
          user_id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1',
          game_id: '84b35ca0-264e-4c0d-b722-bde0f0a2114a',
        },
        {
          id: 'f5bf4aeb-0c74-452b-a924-cfe6bbb9cba5',
          risk_will_happen: false,
          risk_amount: 3,
          points_classic: 0,
          points_risk: -3,
          user_id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          game_id: '84b35ca0-264e-4c0d-b722-bde0f0a2114a',
        },
      ]))
      .then(() => queryInterface.bulkInsert('hp_prediction_predicts_score_for_team', [
        {
          prediction_id: '17f2f2aa-fdd0-40ea-bbfa-1c01492bdc0b',
          team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c',
          goal: 3,
        },
        {
          prediction_id: '17f2f2aa-fdd0-40ea-bbfa-1c01492bdc0b',
          team_id: 'a01e1837-cd8e-4228-8927-387d78f8154d',
          goal: 1,
        },

        {
          prediction_id: '20982cf7-13cc-4cfe-931f-3c74751fa9bd',
          team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c',
          goal: 3,
        },
        {
          prediction_id: '20982cf7-13cc-4cfe-931f-3c74751fa9bd',
          team_id: 'a01e1837-cd8e-4228-8927-387d78f8154d',
          goal: 1,
        },

        {
          prediction_id: '02d9fbfc-8f42-4729-a58b-afd43dca0cd5',
          team_id: '0b4c559c-0acd-449c-92e4-149b2edc000c',
          goal: 2,
        },
        {
          prediction_id: '02d9fbfc-8f42-4729-a58b-afd43dca0cd5',
          team_id: 'a01e1837-cd8e-4228-8927-387d78f8154d',
          goal: 2,
        },

        {
          prediction_id: 'e873a053-40ed-4639-b7c9-fe10c896e0bf',
          team_id: '63ac8931-c579-4228-862d-07a1dfd169fa',
          goal: 0,
        },
        {
          prediction_id: 'e873a053-40ed-4639-b7c9-fe10c896e0bf',
          team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3',
          goal: 0,
        },

        {
          prediction_id: '6d25ad9d-a1e0-482b-ad3f-1022db3d80d6',
          team_id: '63ac8931-c579-4228-862d-07a1dfd169fa',
          goal: 0,
        },
        {
          prediction_id: '6d25ad9d-a1e0-482b-ad3f-1022db3d80d6',
          team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3',
          goal: 0,
        },

        {
          prediction_id: 'f5bf4aeb-0c74-452b-a924-cfe6bbb9cba5',
          team_id: '63ac8931-c579-4228-862d-07a1dfd169fa',
          goal: 3,
        },
        {
          prediction_id: 'f5bf4aeb-0c74-452b-a924-cfe6bbb9cba5',
          team_id: '06480c2d-bead-4562-aa2d-4d2364d493f3',
          goal: 2,
        },
      ]));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: '17f2f2aa-fdd0-40ea-bbfa-1c01492bdc0b' }))
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: '20982cf7-13cc-4cfe-931f-3c74751fa9bd' }))
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: '02d9fbfc-8f42-4729-a58b-afd43dca0cd5' }))
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: 'e873a053-40ed-4639-b7c9-fe10c896e0bf' }))
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: '6d25ad9d-a1e0-482b-ad3f-1022db3d80d6' }))
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: 'f5bf4aeb-0c74-452b-a924-cfe6bbb9cba5' }));
  },
};
