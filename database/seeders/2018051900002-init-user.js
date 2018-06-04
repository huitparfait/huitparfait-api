'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkInsert('hp_user', [
        {
          id: '15c336ea-091b-425a-a99b-190179623ad4',
          oauth_hash: '96d9632f363564cc3032521409cf22a852f2032eec099ed5967c0d000cec607a',
          name: 'John Lennon',
          anonymous_name: 'John L.',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/JohnLennonpeace.jpg/330px-JohnLennonpeace.jpg',
        },
        {
          id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1',
          oauth_hash: '0357513deb903a056e74a7e475247fc1ffe31d8be4c1d4a31f58dd47ae484100',
          name: 'Paul McCartney',
          anonymous_name: 'Paul M.',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Paul_McCartney_black_and_white_2010.jpg/330px-Paul_McCartney_black_and_white_2010.jpg',
        },
        {
          id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          oauth_hash: '0522a55e2d5f0993a3d66d28864b2862a7218a75ea7968b075333434404485c3',
          name: 'George Harrison',
          anonymous_name: 'George H.',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/George_Harrison_1974_edited.jpg/330px-George_Harrison_1974_edited.jpg',
        },
        {
          id: '41c8ca0f-1933-4704-997a-8f42b3721f89',
          oauth_hash: '0f20a0190d87a4c4659060f79fec24fb0bef76808950c6b8fd4b52daf7fc23d5',
          name: 'Ringo Starr',
          anonymous_name: 'Ringo S.',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Ringo_Starr_and_all_his_band_%288470866906%29.jpg/330px-Ringo_Starr_and_all_his_band_%288470866906%29.jpg',
        },
        {
          id: '7681a3ad-24d2-44c4-a73a-2b8f0da16084',
          oauth_hash: 'f34496305470eb1d23d57c253b849fb4840781a127e8eb13aa56b8bb65ee5d1e',
          name: 'Mick Jagger',
          anonymous_name: 'Mick J.',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mick_Jagger_Deauville_2014.jpg/330px-Mick_Jagger_Deauville_2014.jpg',
        },
      ]))
      .then(() => queryInterface.bulkInsert('hp_user_in_group', [
        {
          user_id: '15c336ea-091b-425a-a99b-190179623ad4',
          group_id: '92c34810-d09a-4d80-953f-6943270b4a14',
          is_admin: true,
          is_active: true,
        },
        {
          user_id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1',
          group_id: '92c34810-d09a-4d80-953f-6943270b4a14',
          is_admin: false,
          is_active: true,
        },
        {
          user_id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          group_id: '92c34810-d09a-4d80-953f-6943270b4a14',
          is_admin: false,
          is_active: true,
        },
        {
          user_id: '41c8ca0f-1933-4704-997a-8f42b3721f89',
          group_id: '92c34810-d09a-4d80-953f-6943270b4a14',
          is_admin: false,
          is_active: true,
        },
        {
          user_id: '7681a3ad-24d2-44c4-a73a-2b8f0da16084',
          group_id: '6f53a4f5-89bd-4cbb-9bdc-1d22b862ac03',
          is_admin: true,
          is_active: true,
        },
      ]));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkDelete('hp_user'));
  },
};
