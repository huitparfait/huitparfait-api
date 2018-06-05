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
    anonymousName: 'John L.',
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
  expect(response.body.anonymousName).toEqual('John L.');
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

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
