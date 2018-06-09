'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkInsert('hp_risk', [

        // Groups
        { id: '7e1c34d6-19de-4f4a-b76b-7ea237ee858c', text: `But refusé suite à l'arbitrage vidéo` },

        // All games
        { id: 'fe2defc2-f29b-471c-a76c-08efe095d370', text: `Les deux équipes ont le même score à la mi-temps` },

        // Playoffs
        {
          id: '05474d02-4f53-4b3f-bfd2-c71d7f53231d',
          text: `L'équipe qui marque en premier perd le match (prolongations et tirs aux buts inclus)`,
        },
        {
          id: '27e93a78-9bbd-42d5-b4c2-e19738781944',
          text: `L'équipe qui marque en premier gagne le match (prolongations et tirs aux buts inclus)`,
        },
      ]));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkDelete('hp_risk', { id: '7e1c34d6-19de-4f4a-b76b-7ea237ee858c' }))
      .then(() => queryInterface.bulkDelete('hp_risk', { id: 'fe2defc2-f29b-471c-a76c-08efe095d370' }))
      .then(() => queryInterface.bulkDelete('hp_risk', { id: '05474d02-4f53-4b3f-bfd2-c71d7f53231d' }))
      .then(() => queryInterface.bulkDelete('hp_risk', { id: '27e93a78-9bbd-42d5-b4c2-e19738781944' }));
  },
};
