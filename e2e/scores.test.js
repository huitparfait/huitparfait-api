'use strict';

const auth = require('./utils/auth');
const database = require('./utils/database');
const moment = require('moment-timezone');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

test('PUT /api/games/{gameId}/scores', async () => {

  // Mock date: the day after the first game
  const afterFirstGame = moment.tz('2018-06-15 10:00', 'Europe/Paris').valueOf();
  jest.spyOn(Date, 'now').mockImplementation(() => afterFirstGame);

  const postResponse = await server
    .put(`/api/games/ca1761fb-c319-48ec-bf2f-1e6066d43e25/scores`)
    .send({
      goalsTeamA: 2,
      goalsTeamB: 1,
      riskHappened: false,
    })
    .set('Authorization', `Bearer ${auth.getAdminToken()}`);

  expect(postResponse.status).toEqual(200);

  const listResponse = await server
    .get(`/api/users/me/predictions/previous-days`)
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  const firstGame = listResponse.body['Thu Jun 14 2018 00:00:00 GMT+0200'][0];
  expect(firstGame.goalsTeamA).toEqual(2);
  expect(firstGame.goalsTeamB).toEqual(1);
  expect(firstGame.penaltiesTeamA).toEqual(null);
  expect(firstGame.penaltiesTeamB).toEqual(null);
  expect(firstGame.riskHappened).toEqual(false);

  // Don't forget to restore the real Data.now() function
  Date.now.mockRestore();
  // Reset the DB to avoid weird results
  await database.reset();
}, 20000);

test('PUT /api/games/{gameId}/scores (with penalties)', async () => {

  // Mock date: the day after the first game
  const afterFirstGame = moment.tz('2018-06-15 10:00', 'Europe/Paris').valueOf();
  jest.spyOn(Date, 'now').mockImplementation(() => afterFirstGame);

  const postResponse = await server
    .put(`/api/games/ca1761fb-c319-48ec-bf2f-1e6066d43e25/scores`)
    .send({
      goalsTeamA: 2,
      goalsTeamB: 2,
      penaltiesTeamA: 5,
      penaltiesTeamB: 3,
      riskHappened: false,
    })
    .set('Authorization', `Bearer ${auth.getAdminToken()}`);

  expect(postResponse.status).toEqual(200);

  const listResponse = await server
    .get(`/api/users/me/predictions/previous-days`)
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  const firstGame = listResponse.body['Thu Jun 14 2018 00:00:00 GMT+0200'][0];
  expect(firstGame.goalsTeamA).toEqual(2);
  expect(firstGame.goalsTeamB).toEqual(2);
  expect(firstGame.penaltiesTeamA).toEqual(5);
  expect(firstGame.penaltiesTeamB).toEqual(3);
  expect(firstGame.riskHappened).toEqual(false);

  // Don't forget to restore the real Data.now() function
  Date.now.mockRestore();
  // Reset the DB to avoid weird results
  await database.reset();
}, 20000);

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
