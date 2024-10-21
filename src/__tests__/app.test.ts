import request from 'supertest';
import { server } from '../modules/server';

describe(' Scenario 1. Test GET method', () => {
  test('GET /api/users should return all existing users.', async () => {
    const response = await request(server).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/users/{userId} should return user with id === userId if it exists', async () => {
    const mockUser = {
      username: 'Mikola',
      age: 40,
      hobbies: [],
    };

    const responsePost = await request(server).post('/api/users').send(mockUser);
    const { id } = responsePost.body;

    const responseGet = await request(server).get(`/api/users/${id}`);

    expect(responseGet.status).toBe(200);
    expect(responseGet.body.id).toBe(id);
  });
});

describe('Scenario 2. Test POST method', () => {
  test('POST /api/users should create record about new user and store.', async () => {
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
});
