'use strict';

const request = require('supertest');
const { createServer } = require('../src/server');
const auth = require('./auth/auth');
let server;

test('GET /api/users/me', async () => {

  const response = await server
    .get('/api/users/me')
    .set('Authorization', `Bearer ${await auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    id: '15c336ea-091b-425a-a99b-190179623ad4',
    name: 'John Lennon',
    anonymousName: 'John L.',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/JohnLennonpeace.jpg/330px-JohnLennonpeace.jpg',
    isAnonymous: true,
  });
});

test('GET /api/users/me/groups', async () => {

  const response = await server
    .get('/api/users/me/groups')
    .set('Authorization', `Bearer ${await auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual([{
    id: '92c34810-d09a-4d80-953f-6943270b4a14',
    name: 'The Beatles',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/390px-The_Fabs.JPG',
    isAdmin: true,
    userCount: 4,
  }]);
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
