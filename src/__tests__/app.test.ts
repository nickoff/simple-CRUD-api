import request from 'supertest';
import { server } from '../modules/server';

test('GET /api/users should return all existing users. Scenario 1', async () => {
  const response = await request(server).get('/api/users');

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test('POST /api/users should create record about new user and store. Scenario 2', async () => {
  const mockUser = {
    username: 'Mikola',
    age: 40,
    hobbies: [],
  };

  const response = await request(server).post('/api/users').send(mockUser);

  expect(response.status).toBe(201);
  expect(response.body.username).toEqual(mockUser.username);
  expect(response.body.age).toEqual(mockUser.age);
});
