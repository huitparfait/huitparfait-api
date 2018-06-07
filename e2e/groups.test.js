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

test('POST /api/groups/{id}/users', async () => {

  const firstResponse = await server
    .get('/api/groups/6f53a4f5-89bd-4cbb-9bdc-1d22b862ac03/users')
    .set('Authorization', `Bearer ${auth.getMicksToken()}`);
  expect(firstResponse.body.map((user) => user.name)).toEqual(['Mick Jagger']);

  const secondResponse = await server
    .post('/api/groups/6f53a4f5-89bd-4cbb-9bdc-1d22b862ac03/users')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);
  expect(secondResponse.status).toEqual(200);

  const thirdResponse = await server
    .get('/api/groups/6f53a4f5-89bd-4cbb-9bdc-1d22b862ac03/users')
    .set('Authorization', `Bearer ${auth.getMicksToken()}`);
  expect(thirdResponse.body.map((user) => user.name)).toEqual(['Mick Jagger', 'John Lennon']);

  // Reset the DB to avoid weird results
  await database.reset();
});

test('PUT /api/groups/{groupId}/users/{userId}', async () => {

  const firstResponse = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14/users')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);
  const paul = firstResponse.body.find((user) => user.name === 'Paul McCartney');
  expect(paul.isActive).toEqual(true);

  const secondResponse = await server
    .put('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14/users/e32cf311-3bde-4b16-9c71-40a030cb0cf1')
    .send({
      isActive: false,
    })
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);
  expect(secondResponse.status).toEqual(200);

  const thirdResponse = await server
    .get('/api/groups/92c34810-d09a-4d80-953f-6943270b4a14/users')
    .set('Authorization', `Bearer ${auth.getJohnsToken()}`);
  const updatedPaul = thirdResponse.body.find((user) => user.name === 'Paul McCartney');
  expect(updatedPaul.isActive).toEqual(false);

  // Reset the DB to avoid weird results
  await database.reset();
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
