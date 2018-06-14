'use strict';

const auth = require('./utils/auth');
const moment = require('moment-timezone');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

describe('GET /api/rankings/{groupId}', () => {

  test('Given On June 16, no pagination', async () => {

    // Mock date: one second before the beginning of game 2
    const june16 = moment.tz('2018-06-16 10:00', 'Europe/Paris').valueOf();
    jest.spyOn(Date, 'now').mockImplementation(() => june16);

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
          nbPredictions: 3,
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
          nbPredictions: 3,
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
          nbPredictions: 1,
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
          nbPredictions: 3,
          nbPerfects: 0,
        },
      },
    ]);

    // Don't forget to restore the real Date.now() function
    Date.now.mockRestore();
  });

  test('Given On June 15, no pagination', async () => {

    // Mock date: one second before the beginning of game 2
    const june16 = moment.tz('2018-06-15 10:00', 'Europe/Paris').valueOf();
    jest.spyOn(Date, 'now').mockImplementation(() => june16);

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
          totalScore: 8,
          nbPredictions: 1,
          nbPerfects: 1,
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
          totalScore: 8,
          nbPredictions: 1,
          nbPerfects: 1,
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
          totalScore: -3,
          nbPredictions: 1,
          nbPerfects: 0,
        },
      },
    ]);

    // Don't forget to restore the real Date.now() function
    Date.now.mockRestore();
  });

  test('Given On June 14, no pagination (no predictions yet)', async () => {

    // Mock date: one second before the beginning of game 2
    const june16 = moment.tz('2018-06-14 10:00', 'Europe/Paris').valueOf();
    jest.spyOn(Date, 'now').mockImplementation(() => june16);

    const response = await server
      .get('/api/rankings/92c34810-d09a-4d80-953f-6943270b4a14')
      .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        user: {
          id: '25e34902-c663-43a1-9dc3-9ab4c7e1c30d',
          name: 'George Harrison',
          avatarUrl: expect.anything(),
          anonymousName: 'Corbeau éveillé',
        },
        rank: 1,
        stats: {
          totalScore: 0,
          nbPredictions: 0,
          nbPerfects: 0,
        },
      },
      {
        user: {
          id: '15c336ea-091b-425a-a99b-190179623ad4',
          name: 'John Lennon',
          avatarUrl: expect.anything(),
          anonymousName: 'Poulpe rassurant',
        },
        rank: 1,
        stats: {
          totalScore: 0,
          nbPredictions: 0,
          nbPerfects: 0,
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
          totalScore: 0,
          nbPredictions: 0,
          nbPerfects: 0,
        },
      },
      {
        user: {
          id: '41c8ca0f-1933-4704-997a-8f42b3721f89',
          name: 'Ringo Starr',
          avatarUrl: expect.anything(),
          anonymousName: 'Pingouin paisible',
        },
        rank: 1,
        stats: {
          totalScore: 0,
          nbPredictions: 0,
          nbPerfects: 0,
        },
      },
    ]);

    // Don't forget to restore the real Date.now() function
    Date.now.mockRestore();
  });

  test('Given June 16, page=2, pageSize=2', async () => {

    // Mock date: one second before the beginning of game 2
    const june16 = moment.tz('2018-06-16 10:00', 'Europe/Paris').valueOf();
    jest.spyOn(Date, 'now').mockImplementation(() => june16);

    const response = await server
      .get('/api/rankings/92c34810-d09a-4d80-953f-6943270b4a14?page=2&pageSize=2')
      .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body.map((player) => player.user.name)).toEqual(['Ringo Starr', 'George Harrison']);

    // Don't forget to restore the real Date.now() function
    Date.now.mockRestore();
  });

});

describe('GET /api/rankings/general', () => {

  test('Given on June 14 (no predictions yet)', async () => {

    const june16 = moment.tz('2018-06-14 10:00', 'Europe/Paris').valueOf();
    jest.spyOn(Date, 'now').mockImplementation(() => june16);

    const response = await server
      .get('/api/rankings/general')
      .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(5);

    expect(response.body.map((userToRank) => userToRank.user.name)).toEqual([
      'Corbeau éveillé',
      'Hydre savante',
      'Panthère extravertie',
      'Pingouin paisible',
      'John Lennon',
    ]);

    // Don't forget to restore the real Date.now() function
    Date.now.mockRestore();
  });

  test('Given on June 16', async () => {

    const june16 = moment.tz('2018-06-16 10:00', 'Europe/Paris').valueOf();
    jest.spyOn(Date, 'now').mockImplementation(() => june16);

    const response = await server
      .get('/api/rankings/general')
      .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(5);

    expect(response.body.map((userToRank) => userToRank.user.name)).toEqual([
      'Hydre savante',
      'John Lennon',
      'Panthère extravertie',
      'Pingouin paisible',
      'Corbeau éveillé',
    ]);

    // Don't forget to restore the real Date.now() function
    Date.now.mockRestore();
  });

});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
