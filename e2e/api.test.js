'use strict';

const request = require('supertest');
const { createServer } = require('../src/server');
let server;

test('GET /', async () => {
  const response = await server.get('/');
  expect(response.status).toEqual(200);
});

test('GET /api/ping', async () => {
  const response = await server.get('/api/ping');
  expect(response.status).toEqual(200);
  expect(response.text).toEqual('pong!');
});

beforeAll(async () => {
  const hapiServer = await createServer();
  server = request(hapiServer.listener);
});
