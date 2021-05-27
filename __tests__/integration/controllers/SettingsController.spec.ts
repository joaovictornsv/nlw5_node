import request from 'supertest';
import { getConnection } from 'typeorm';
import { http } from '../../../src/app';
import createConnection from '../../../src/database';

describe('Settings Controller', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });
  it('should create a new user', async () => {
    const response = await request(http)
      .post('/settings')
      .send({ chat: true, username: 'user' });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not create a user if email already exists', async () => {
    const response = await request(http)
      .post('/settings')
      .send({ chat: true, username: 'user' });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('User already exists');
  });

  it('should get a user', async () => {
    const response = await request(http)
      .get('/settings/user')
      .send({ chat: true, username: 'user' });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toEqual('user');
  });

  it('should update a user', async () => {
    const response = await request(http)
      .put('/settings/user')
      .send({ chat: true });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Settings updated!');
  });
});
