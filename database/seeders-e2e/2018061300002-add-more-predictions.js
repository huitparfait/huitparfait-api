'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkInsert('hp_prediction', [
        {
          id: '2a95229f-2460-4773-8c71-f2d9f2963dee',
          risk_will_happen: true,
          risk_amount: 3,
          points_classic: null,
          points_risk: null,
          user_id: '15c336ea-091b-425a-a99b-190179623ad4',
          game_id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f',
        },
        {
          id: '20b21913-5a53-4e10-b23c-c1047f225992',
          risk_will_happen: false,
          risk_amount: 2,
          points_classic: null,
          points_risk: null,
          user_id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1',
          game_id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f',
        },
        {
          id: 'c80813d2-31ce-49dd-860e-301920b40bee',
          risk_will_happen: false,
          risk_amount: 1,
          points_classic: null,
          points_risk: null,
          user_id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          game_id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f',
        },
        {
          id: 'a9012fc9-dc4c-4a02-bc2c-2431c3946b36',
          risk_will_happen: true,
          risk_amount: 2,
          points_classic: null,
          points_risk: null,
          user_id: '41c8ca0f-1933-4704-997a-8f42b3721f89',
          game_id: '7575cd3e-50bc-40ce-9754-ebde487c9d5f',
        },
      ]))
      .then(() => queryInterface.bulkInsert('hp_prediction_predicts_score_for_team', [
        {
          prediction_id: '2a95229f-2460-4773-8c71-f2d9f2963dee',
          team_id: '2bb2fcae-f952-4316-987c-a87004c070e6',
          goal: 2,
        },
        {
          prediction_id: '2a95229f-2460-4773-8c71-f2d9f2963dee',
          team_id: '0f2cb33f-21b8-4054-9aaa-2bdcb678d48c',
          goal: 2,
        },

        {
          prediction_id: '20b21913-5a53-4e10-b23c-c1047f225992',
          team_id: '2bb2fcae-f952-4316-987c-a87004c070e6',
          goal: 1,
        },
        {
          prediction_id: '20b21913-5a53-4e10-b23c-c1047f225992',
          team_id: '0f2cb33f-21b8-4054-9aaa-2bdcb678d48c',
          goal: 0,
        },

        {
          prediction_id: 'c80813d2-31ce-49dd-860e-301920b40bee',
          team_id: '2bb2fcae-f952-4316-987c-a87004c070e6',
          goal: 1,
        },
        {
          prediction_id: 'c80813d2-31ce-49dd-860e-301920b40bee',
          team_id: '0f2cb33f-21b8-4054-9aaa-2bdcb678d48c',
          goal: 2,
        },

        {
          prediction_id: 'a9012fc9-dc4c-4a02-bc2c-2431c3946b36',
          team_id: '2bb2fcae-f952-4316-987c-a87004c070e6',
          goal: 1,
        },
        {
          prediction_id: 'a9012fc9-dc4c-4a02-bc2c-2431c3946b36',
          team_id: '0f2cb33f-21b8-4054-9aaa-2bdcb678d48c',
          goal: 6,
        },
      ]));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: '2a95229f-2460-4773-8c71-f2d9f2963dee' }))
      .then(() => queryInterface.bulkDelete('hp_prediction', { id: '20b21913-5a53-4e10-b23c-c1047f225992' }));
  },
};
