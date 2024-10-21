import http, { type IncomingMessage, type ServerResponse } from 'http';
import { validate } from 'uuid';
import { parseBody } from '../utils/parse-body';
import { Users } from '../store/users';

const users = new Users();

const handlePostPutRequest = (
  request: IncomingMessage,
  response: ServerResponse,
  idParam?: string | undefined,
): void => {
  parseBody(request)
    .then(async (newUser) => {
      if (newUser === null) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end();
      } else {
        if (idParam != null) {
          await users.updateUserById(idParam, newUser);
        } else {
          await users.addUser(newUser);
        }
        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end();
      }
    })
    .catch((error) => {
      console.log(error.message);
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(error.message));
    });
};

export const requestHandler = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  try {
    const idParam = request.url?.split('/')[3];

    if (request.url === '/favicon.ico') {
      response.writeHead(200, { 'Content-Type': 'image/x-icon' });
      response.end();
    }

    if (idParam == null) {
      if (request.url === '/api/users' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(await users.getUsers()));
      } else if (request.url === '/api/users' && request.method === 'POST') {
        handlePostPutRequest(request, response);
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end('Not found endpoint');
      }
    }

    if (idParam != null) {
      if (validate(idParam)) {
        if (
          (request.url?.startsWith('/api/users') ?? false) &&
          request.method === 'GET' &&
          idParam != null &&
          (await users.getUserById(idParam)) != null
        ) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(await users.getUserById(idParam)));
        } else if (
          (request.url?.startsWith('/api/users') ?? false) &&
          request.method === 'PUT' &&
          idParam != null &&
          (await users.getUserById(idParam)) != null
        ) {
          handlePostPutRequest(request, response, idParam);
        } else if (
          (request.url?.startsWith('/api/users') ?? false) &&
          request.method === 'DELETE' &&
          idParam != null &&
          users.getUserById(idParam) != null
        ) {
          response.writeHead(204, { 'Content-Type': 'application/json' });
          await users.deleteUserById(idParam);
          response.end();
        } else {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end('Not found endpoint');
        }
      } else {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end('Invalid id');
      }
    }
  } catch (error) {
    console.log(error);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end('Internal server error');
  }
};

const server = http.createServer((request, response) => {
  requestHandler(request, response).catch(() => {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Internal Server Error');
  });
});

export const startServer = (port: number): void => {
  server.listen(port, () => {
    console.log(`Server has been started by host http://localhost:${port}`);
  });
};
