'use strict';

const auth = require('./utils/auth');
const database = require('./utils/database');
const moment = require('moment-timezone');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

test('GET /api/prediction-points/compute', async () => {

  // Mock date: after the first 4 games
  const setScoreDate = moment.tz('2018-06-16 00:30', 'Europe/Paris').valueOf();
  const seeRankingDate = moment.tz('2018-06-16 10:00', 'Europe/Paris').valueOf();

  jest.spyOn(Date, 'now').mockImplementation(() => setScoreDate);

  const computeResponse = await server
    .post('/api/prediction-points/compute')
    .set('Authorization', `Bearer ${auth.getAdminToken()}`);
  expect(computeResponse.status).toEqual(200);

  jest.spyOn(Date, 'now').mockImplementation(() => seeRankingDate);

  const rankingsResponse = await server
    .get('/api/rankings/92c34810-d09a-4d80-953f-6943270b4a14')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);
  expect(rankingsResponse.status).toEqual(200);

  const rankings = rankingsResponse.body.map((userWithStats) => {
    return {
      totalScore: userWithStats.stats.totalScore,
      nbPredictions: userWithStats.stats.nbPredictions,
      nbPerfects: userWithStats.stats.nbPerfects,
      name: userWithStats.user.name,
    };
  });

  expect(rankings).toEqual([
    { totalScore: 19, nbPredictions: 3, nbPerfects: 2, name: 'Paul McCartney' },
    { totalScore: 14, nbPredictions: 3, nbPerfects: 2, name: 'John Lennon' },
    { totalScore: 2, nbPredictions: 1, nbPerfects: 0, name: 'Ringo Starr' },
    { totalScore: 0, nbPredictions: 3, nbPerfects: 0, name: 'George Harrison' },
  ]);

  Date.now.mockRestore();
  await database.reset();
}, 30000);

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
