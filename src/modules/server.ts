import http, { type IncomingMessage, type ServerResponse } from 'http';
import { parseBody } from '../utils/parse-body';
import { Users } from '../store/users';

const users = new Users();

export const requestHandler = (request: IncomingMessage, response: ServerResponse): void => {
  const idParam = request.url?.split('/')[3];
  if (request.url === '/api/users' && request.method === 'GET') {
    response.writeHead(200);
    response.end(JSON.stringify(users.getUsers()));
  } else if (request.url === '/api/users' && request.method === 'POST') {
    parseBody(request)
      .then((newUser) => {
        if (newUser === null) {
          response.writeHead(400);
          response.end();
        } else {
          users.addUser(newUser);
          response.writeHead(201);
          response.end();
        }
      })
      .catch((error) => {
        console.log(error.message);
        response.writeHead(400);
        response.end(JSON.stringify(error.message));
      });
  } else if (request.url === '/favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    response.end();
  } else if (
    (request.url?.startsWith('/api/users') ?? false) &&
    request.method === 'GET' &&
    idParam != null &&
    users.getUserById(idParam) != null
  ) {
    response.writeHead(200);
    response.end(JSON.stringify(users.getUserById(idParam)));
  } else if (
    (request.url?.startsWith('/api/users') ?? false) &&
    request.method === 'PUT' &&
    idParam != null &&
    users.getUserById(idParam) != null
  ) {
    parseBody(request)
      .then((newUser) => {
        if (newUser === null) {
          response.writeHead(400);
          response.end();
        } else {
          users.updateUserById(idParam, newUser);
          response.writeHead(201);
          response.end();
        }
      })
      .catch((error) => {
        console.log(error.message);
        response.writeHead(400);
        response.end(JSON.stringify(error.message));
      });
  } else if (
    (request.url?.startsWith('/api/users') ?? false) &&
    request.method === 'DELETE' &&
    idParam != null &&
    users.getUserById(idParam) != null
  ) {
    response.writeHead(204);
    users.deleteUserById(idParam);
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end('Not found endpoint');
  }
};

const server = http.createServer(requestHandler);

export const startServer = (port: number): void => {
  server.listen(port, () => {
    console.log(`Server has been started by host http://localhost:${port}`);
  });
};
