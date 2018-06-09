'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkUpdate('hp_user', { anonymous_name: 'Poulpe rassurant' }, { id: '15c336ea-091b-425a-a99b-190179623ad4' }))
      .then(() => queryInterface.bulkUpdate('hp_user', { anonymous_name: 'Hydre savante' }, { id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1' }))
      .then(() => queryInterface.bulkUpdate('hp_user', { anonymous_name: 'Corbeau éveillé' }, { id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d' }))
      .then(() => queryInterface.bulkUpdate('hp_user', { anonymous_name: 'Pingouin paisible' }, { id: '41c8ca0f-1933-4704-997a-8f42b3721f89' }))
      .then(() => queryInterface.bulkUpdate('hp_user', { anonymous_name: 'Panthère extraverti' }, { id: '7681a3ad-24d2-44c4-a73a-2b8f0da16084' }));
  },

  down: (queryInterface, Sequelize) => {
  },
};
