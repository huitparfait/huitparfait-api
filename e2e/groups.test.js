'use strict';

const auth = require('./utils/auth');
const database = require('./utils/database');
const request = require('supertest');
const { createServer } = require('../src/server');

let server;

test('POST /api/groups', async () => {

  const response = await server
    .post('/api/groups')
    .send({
      name: 'Nirvana',
      avatarUrl: 'https://fr.wikipedia.org/wiki/Nirvana_(groupe)#/media/File:NirvanaLogo.png',
    })
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  // a UUID
  expect(response.body.id).toHaveLength(36);
  expect(response.body.name).toEqual('Nirvana');
  expect(response.body.avatarUrl).toEqual('https://fr.wikipedia.org/wiki/Nirvana_(groupe)#/media/File:NirvanaLogo.png');
  expect(response.body.isAdmin).toEqual(true);
  expect(response.body.userCount).toEqual(1);

  // Reset the DB to avoid weird results
  await database.reset();
});

test('GET /api/groups/{id}', async () => {

  const response = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    id: '92c34810-d09a-4d80-953f-6943270b4a14',
    name: 'The Beatles',
    slug: 'the-beatles',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/390px-The_Fabs.JPG',
    userCount: 4,
  });
});

test('PUT /api/groups/{id}', async () => {

  const response = await server
    .put('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14')
    .send({
      name: 'The Better Beatles',
      avatarUrl: 'https://fr.wikipedia.org/wiki/Better_Beatles.jpg',
    })
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual('92c34810-d09a-4d80-953f-6943270b4a14');
  expect(response.body.name).toEqual('The Better Beatles');
  expect(response.body.avatarUrl).toEqual('https://fr.wikipedia.org/wiki/Better_Beatles.jpg');

  // Reset the DB to avoid weird results
  await database.reset();
});

test('DELETE /api/groups/{id}', async () => {

  const firstResponse = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(firstResponse.status).toEqual(200);

  const secondResponse = await server
    .del('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(secondResponse.status).toEqual(204);

  const thirdResponse = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(thirdResponse.status).toEqual(404);

  // Reset the DB to avoid weird results
  await database.reset();
});

test('GET /api/groups/{id}/users', async () => {

  const response = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14/users')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);

  expect(response.status).toEqual(200);
  expect(response.body.map((user) => user.name)).toEqual(['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr']);
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
