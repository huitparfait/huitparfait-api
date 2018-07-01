'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
    // Mixup between game 49 and 50
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 50' }, { id: '063484e8-8c22-428e-8ced-87363c8fa102' }))
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 49' }, { id: '9b47cf8c-a5d5-486f-824f-2833449bd392' }))
      // Mixup between game 59 and 60
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 60' }, { id: '71ef2baa-fda8-457f-a22f-1f18e88f2a24' }))
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 59' }, { id: '68832893-8c24-4a51-b973-925c8b66db25' }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
    // Mixup between game 49 and 50
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 49' }, { id: '063484e8-8c22-428e-8ced-87363c8fa102' }))
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 50' }, { id: '9b47cf8c-a5d5-486f-824f-2833449bd392' }))
      // Mixup between game 59 and 60
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 59' }, { id: '71ef2baa-fda8-457f-a22f-1f18e88f2a24' }))
      .then(() => queryInterface.bulkUpdate('hp_game', { name: 'Match 60' }, { id: '68832893-8c24-4a51-b973-925c8b66db25' }))
  },
}
