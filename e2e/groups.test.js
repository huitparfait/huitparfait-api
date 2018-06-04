'use strict';

const auth = require('./utils/auth');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

test('GET /api/groups/{id}', async () => {

  const response = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    id: '92c34810-d09a-4d80-953f-6943270b4a14',
    name: 'The Beatles',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/390px-The_Fabs.JPG',
    userCount: 4,
  });
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
