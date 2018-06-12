'use strict';

const auth = require('./utils/auth');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

describe('GET /api/rankings/{groupId}', () => {

  test('Given no pagination', async () => {

    const response = await server
      .get('/api/rankings/92c34810-d09a-4d80-953f-6943270b4a14')
      .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        user: {
          id: '15c336ea-091b-425a-a99b-190179623ad4',
          name: 'John Lennon',
          avatarUrl: expect.anything(),
          anonymousName: 'Poulpe rassurant',
        },
        rank: 1,
        stats: {
          totalScore: 16,
          nbPredictions: 2,
          nbPerfects: 2,
        },
      },
      {
        user: {
          id: 'e32cf311-3bde-4b16-9c71-40a030cb0cf1',
          name: 'Paul McCartney',
          avatarUrl: expect.anything(),
          anonymousName: 'Hydre savante',
        },
        rank: 1,
        stats: {
          totalScore: 16,
          nbPredictions: 2,
          nbPerfects: 2,
        },
      },
      {
        user: {
          id: '41c8ca0f-1933-4704-997a-8f42b3721f89',
          name: 'Ringo Starr',
          avatarUrl: expect.anything(),
          anonymousName: 'Pingouin paisible',
        },
        rank: 3,
        stats: {
          totalScore: 0,
          nbPredictions: 0,
          nbPerfects: 0,
        },
      },
      {
        user: {
          id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          name: 'George Harrison',
          avatarUrl: expect.anything(),
          anonymousName: 'Corbeau éveillé',
        },
        rank: 4,
        stats: {
          totalScore: -6,
          nbPredictions: 2,
          nbPerfects: 0,
        },
      },
    ]);
  });

  test('Given page=2, pageSize=2', async () => {

    const response = await server
      .get('/api/rankings/92c34810-d09a-4d80-953f-6943270b4a14?page=2&pageSize=2')
      .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        user: {
          id: '41c8ca0f-1933-4704-997a-8f42b3721f89',
          name: 'Ringo Starr',
          avatarUrl: expect.anything(),
          anonymousName: 'Pingouin paisible',
        },
        rank: 3,
        stats: {
          totalScore: 0,
          nbPredictions: 0,
          nbPerfects: 0,
        },
      },
      {
        user: {
          id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          name: 'George Harrison',
          avatarUrl: expect.anything(),
          anonymousName: 'Corbeau éveillé',
        },
        rank: 4,
        stats: {
          totalScore: -6,
          nbPredictions: 2,
          nbPerfects: 0,
        },
      },
    ]);
  });

});

test('GET /api/rankings/general', async () => {

  const response = await server
    .get('/api/rankings/general')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toHaveLength(5);

  expect(response.body.map((userToRank) => userToRank.user.name)).toEqual([
    'John Lennon',
    'Hydre savante',
    'Panthère extravertie',
    'Pingouin paisible',
    'Corbeau éveillé',
  ]);
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
