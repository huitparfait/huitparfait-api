'use strict';

const auth = require('./utils/auth');
const database = require('./utils/database');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

test('POST /api/users/me', async () => {

  // Make a first call (creation after first login)
  const firstResponse = await server
    .post('/api/users/me')
    .send({
      oauthHash: 'testHash',
      name: 'Kurt Cobain',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Nirvana_around_1992.jpg',
    })
    .set('Authorization', `Bearer ${auth.getAnonymousToken()}`);

  expect(firstResponse.status).toEqual(200);
  // a UUID
  expect(firstResponse.body.id).toHaveLength(36);
  expect(firstResponse.body.name).toEqual('Kurt Cobain');
  // Anonymous name should be in two words or more
  expect(firstResponse.body.anonymousName.split(' ').length).toBeGreaterThan(1);
  expect(firstResponse.body.avatarUrl).toEqual('https://upload.wikimedia.org/wikipedia/commons/1/19/Nirvana_around_1992.jpg');
  expect(firstResponse.body.isAnonymous).toEqual(true);

  // Make a second call (second login)
  const secondResponse = await server
    .post('/api/users/me')
    .send({
      oauthHash: 'testHash',
      name: 'Wrong Name',
      avatarUrl: 'https://wrong.image.location',
    })
    .set('Authorization', `Bearer ${auth.getAnonymousToken()}`);

  expect(secondResponse.status).toEqual(200);
  // Should not have changed
  expect(secondResponse.body.name).toEqual('Kurt Cobain');
  // Should not have changed after update!
  expect(secondResponse.body.anonymousName).toEqual(firstResponse.body.anonymousName);
  // Should not have changed
  expect(secondResponse.body.avatarUrl).toEqual('https://upload.wikimedia.org/wikipedia/commons/1/19/Nirvana_around_1992.jpg');
  expect(secondResponse.body.isAnonymous).toEqual(true);

  // Reset the DB to avoid weird results
  await database.reset();
});

test('GET /api/users/me', async () => {

  const response = await server
    .get('/api/users/me')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    id: '15c336ea-091b-425a-a99b-190179623ad4',
    name: 'John Lennon',
    anonymousName: 'Poulpe rassurant',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/JohnLennonpeace.jpg/330px-JohnLennonpeace.jpg',
    isAnonymous: true,
  });
});

test('PUT /api/users/me', async () => {

  const response = await server
    .put('/api/users/me')
    .send({
      name: 'Jon Lemon',
      avatarUrl: 'https://new.jons.avatar.location',
      isAnonymous: false,
    })
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body.name).toEqual('Jon Lemon');
  // Anonymous name should be in two words or more
  expect(response.body.anonymousName).toEqual('Poulpe rassurant');
  expect(response.body.avatarUrl).toEqual('https://new.jons.avatar.location');
  expect(response.body.isAnonymous).toEqual(false);

  // Reset the DB to avoid weird results
  await database.reset();
});

test('GET /api/users/me/groups', async () => {

  const response = await server
    .get('/api/users/me/groups')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual([{
    id: '92c34810-d09a-4d80-953f-6943270b4a14',
    name: 'The Beatles',
    slug: 'the-beatles',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/390px-The_Fabs.JPG',
    isAdmin: true,
    userCount: 4,
  }]);
});

describe('POST /api/users/me/predictions', () => {

  test('Given a null risk', async () => {

    const response = await server
      .post('/api/users/me/predictions')
      .send({
        gameId: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25',
        predictionScoreTeamA: 2,
        predictionScoreTeamB: 1,
        predictionRiskAnswer: null,
        predictionRiskAmount: 3,
      })
      .set('Authorization', `Bearer ${await auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body.gameId).toEqual('ca1761fb-c319-48ec-bf2f-1e6066d43e25');
    expect(response.body.predictionScoreTeamA).toEqual(2);
    expect(response.body.predictionScoreTeamB).toEqual(1);
    expect(response.body.predictionRiskAnswer).toEqual(null);
    expect(response.body.predictionRiskAmount).toEqual(3);
    expect(response.body.id).toHaveLength(36);

    // Reset the DB to avoid weird results
    await database.reset();
  });

  test('Given a risk not null', async () => {

    const response = await server
      .post('/api/users/me/predictions')
      .send({
        gameId: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25',
        predictionScoreTeamA: 2,
        predictionScoreTeamB: 1,
        predictionRiskAnswer: true,
        predictionRiskAmount: 3,
      })
      .set('Authorization', `Bearer ${await auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body.gameId).toEqual('ca1761fb-c319-48ec-bf2f-1e6066d43e25');
    expect(response.body.predictionScoreTeamA).toEqual(2);
    expect(response.body.predictionScoreTeamB).toEqual(1);
    expect(response.body.predictionRiskAnswer).toEqual(true);
    expect(response.body.predictionRiskAmount).toEqual(3);
    expect(response.body.id).toHaveLength(36);

    // Reset the DB to avoid weird results
    await database.reset();
  });

});

test('GET /api/users/me/predictions/{period}', async () => {

  // Mock date: we're on January 1st, 2018 (1514761200)
  jest.spyOn(Date, 'now').mockImplementation(() => 1514761200);

  const response = await server
    .get('/api/users/me/predictions/next-days')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  // Check that we have all needed information for one game
  expect(response.body['Thu Jun 14 2018 00:00:00 GMT+0200']).toEqual([{
    gameId: 'ca1761fb-c319-48ec-bf2f-1e6066d43e25',
    phase: 'Groupes',
    city: 'Moscou',
    gameName: 'Match 1',
    stadium: 'Luzhniki Stadium',
    startsAt: '2018-06-14T15:00:00.000Z',
    idTeamA: '0b4c559c-0acd-449c-92e4-149b2edc000c',
    idTeamB: 'a01e1837-cd8e-4228-8927-387d78f8154d',
    codeTeamB: 'sa',
    nameTeamA: 'Russie',
    codeTeamA: 'ru',
    nameTeamB: 'Arabie Saoudite',
    group: 'A',
    goalsTeamA: null,
    goalsTeamB: null,
    penaltiesTeamB: null,
    penaltiesTeamA: null,
    riskId: '0adaad33-7036-4ffc-8da7-a2b90a2030d0',
    riskTitle: 'Chaque équipe marque au moins un but',
    predictionScoreTeamA: null,
    predictionScoreTeamB: null,
    predictionRiskAnswer: null,
    predictionRiskAmount: 3,
    classicPoints: null,
    riskPoints: null,
    riskHappened: null,
  }]);
  // 3 games on that day
  expect(response.body['Fri Jun 15 2018 00:00:00 GMT+0200']).toHaveLength(3);

  // Don't forget tu restore the real Data.now() function
  Date.now.mockRestore();
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
