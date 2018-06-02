'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkInsert('hp_risk', [
        { id: '08705cff-e4a2-4d1a-8940-1cce00c2c2f4', text: `Risquette non déterminée` },
        // Groups
        { id: '9816d4f5-0950-4949-af78-3a7a7c3c657a', text: `Au moins 2 buts d'écart` },
        { id: 'e254c3e9-147e-42fe-80f1-41ceabba8691', text: `Au moins un but après la 80ème minute` },
        { id: '0fd42b80-6f9d-4b58-b1e0-f5a9d960b333', text: `Au moins un but après la 70ème minute` },
        { id: 'c8a5249e-c39a-4354-acd4-4ba2232c0654', text: `Au moins un but de la tête` },
        { id: '75fa3cba-3c04-4b9f-99aa-b4a9eaad56c2', text: `Au moins un but sur penalty` },
        { id: 'f1dffb39-8ac0-4335-a0e4-ae4a3552108f', text: `Autant de buts en première qu'en seconde période` },
        { id: '5975ade4-c364-47a6-94f3-07989478236c', text: `But d'un joueur avec un numéro impair` },
        { id: '55ece773-0b3f-42b6-96d0-a9bfa1350fe9', text: `But d'un joueur avec un numéro pair` },
        { id: 'f837ec99-4855-47a9-9c04-61cfcf221d7a', text: `But d'un joueur ayant 27 ans ou plus` },
        { id: 'd00cb393-b745-4085-8679-ee99f30038f1', text: `But d'un joueur ayant moins de 25 ans` },
        { id: '57501ad2-2289-4420-a54e-f33b4485dbc2', text: `But du pied gauche` },
        { id: '0adaad33-7036-4ffc-8da7-a2b90a2030d0', text: `Chaque équipe marque au moins un but` },
        { id: '79c2f1f3-fb7b-4cd2-931e-9bf5ef56607a', text: `Score total impair` },
        { id: '2ee708d4-96f3-4917-acd3-a231b0f22a23', text: `Score total pair` },
        // All games
        { id: '515fdb18-0f8e-4965-a583-8d996c39c517', text: `Au moins 2 corners par équipe` },
        { id: 'c342e770-502f-4a8a-be1f-52d5e7985604', text: `Au moins 3 cartons jaunes` },
        { id: 'e66566c2-d3a4-4ff5-bdbf-29118636bdf6', text: `Au moins 7 hors-jeu sifflés` },
        { id: '42bae968-6734-4ed4-a528-399757868526', text: `Au moins un but dans les 10 premières minutes` },
        { id: '23b7c0ae-d10b-4799-adb3-d3d43dfa72b7', text: `Au moins un expulsé` },
        { id: 'd3094bfd-0068-49ad-bf9b-fbbb812bd026', text: `Au moins un remplacement avant la mi-temps` },
        { id: 'a2e58a7e-8ea3-433b-8867-7c84e8f7c1b1', text: `Le joueur du match a un numéro impair` },
        { id: 'f8d11f67-bc25-4622-8b8f-c6020a29cb0b', text: `Le joueur du match a un numéro pair` },
        { id: '70ea8d09-021d-43a7-810a-1d128e593a1b', text: `Les 6 changements sont effectués` },
        { id: '4bb5a570-1d07-432d-b5cb-da10e7e292f7', text: `Un joueur sort sur civière` },
        { id: 'c44f409f-b0f2-475c-9df3-bf16f117e189', text: `But d'un joueur contre son camp` },
        // Playoffs
        { id: 'ed09df51-7697-40ba-80eb-ce0f390b45bb', text: `Les prolongations sont jouées` },
        { id: 'f3873038-a87f-4945-b67d-f4fe1d3a2eed', text: `Plus de fautes commises par l'équipe vainqueur` },
        { id: 'ff7c3ca6-5291-4bd0-8ac0-a30d50988e61', text: `Plus de fautes commises par l'équipe perdante` },
        { id: '16f5dedf-d16d-4412-810f-acd1ef542b5b', text: `Le joueur du match est dans l'équipe vainqueur` },
        { id: 'c0149697-15d8-4dfb-a3e2-39bdffb2781c', text: `Le joueur du match est dans l'équipe perdrante` },
        {
          id: '7fb70eef-3c9b-4a6c-b9f6-69b38b512d96',
          text: `But d'un joueur ayant moins de 25 ans (prolongations incluses, hors tirs aux buts)`,
        },
        {
          id: '31c863cd-e31d-4267-8650-47bd4e1a86bf',
          text: `But d'un joueur ayant 27 ans ou plus (prolongations incluses, hors tirs aux buts)`,
        },
        {
          id: '190de97c-9d98-45b5-b0c4-8d4bf27d753a',
          text: `Chaque équipe marque au moins un but (prolongations incluses, hors tirs aux buts)`,
        },
        {
          id: '22921279-73dc-4928-b2ff-25496a97f4a1',
          text: `Possession de balle à l'avantage de l'équipe qui perd (prolongations incluses, hors tirs aux buts)`,
        },
        {
          id: '803ddbac-0df4-49f0-9936-89f24e5a66b0',
          text: `Possession de balle à l'avantage de l'équipe qui gagne (prolongations incluses, hors tirs aux buts)`,
        },
        {
          id: '472545e8-90ce-4a95-ad3a-e2c49e6e4f7e',
          text: `Au moins un but après la 70ème minute (hors prolongations et tirs aux buts)`,
        },
        {
          id: '19cf5987-2e38-4e5c-be82-5ed0ab79b04b',
          text: `Au moins un but après la 80ème minute (hors prolongations et tirs aux buts)`,
        },
        {
          id: '86e28d66-b4ec-4fce-ac80-48f089c883cb',
          text: `Au moins 2 buts d'écart (prolongations incluses, hors tirs aux buts)`,
        },
        {
          id: 'ecff958c-cb88-4c7c-b281-09b4a3c97577',
          text: `Au moins un but de la tête (prolongations et tirs aux buts inclus)`,
        },
        {
          id: '1999acef-066f-42c9-9a77-3cddb83d1eae',
          text: `But du pied gauche (prolongations incluses, hors tirs aux buts)`,
        },
      ]))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
    .then(() => queryInterface.bulkDelete('hp_risk'))
  },
}
