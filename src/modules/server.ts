import http, { type IncomingMessage, type ServerResponse } from 'http';

const requestHandler = (request: IncomingMessage, response: ServerResponse): void => {
  console.log(request.url);
  if (request.url === '/api/users' && request.method === 'GET') {
    response.writeHead(200);
    response.end(JSON.stringify([]));
  } else if (request.url === '/favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end('Error 404: Page not found!');
  }
};

const server = http.createServer(requestHandler);

export const startServer = (port: number): void => {
  server.listen(port, () => {
    console.log(`Server has been started by host http://localhost:${port}`);
  });
};
