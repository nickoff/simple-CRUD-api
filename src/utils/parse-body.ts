import { type IncomingMessage } from 'node:http';
import { type UserModel } from 'models/user.model';

export const parseBody = async (request: IncomingMessage): Promise<UserModel | null> => {
  return new Promise((resolve, reject) => {
    request.setEncoding('utf-8');
    let body = '';
    request
      .on('data', (data) => {
        body += data;
      })
      .on('end', () => {
        try {
          resolve(JSON.parse(body) as UserModel);
        } catch (error) {
          reject(error);
        }
      });
  });
};
