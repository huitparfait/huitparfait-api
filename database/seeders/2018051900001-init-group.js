'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkInsert('hp_group', [
        {
          id: '92c34810-d09a-4d80-953f-6943270b4a14',
          name: 'The Beatles',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/390px-The_Fabs.JPG',
        },
        {
          id: '6f53a4f5-89bd-4cbb-9bdc-1d22b862ac03',
          name: 'The Rolling Stones',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Trs_20150623_milwaukee_jp_105.jpg/415px-Trs_20150623_milwaukee_jp_105.jpg',
        },
      ]))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkDelete('hp_group'))
  },
}
