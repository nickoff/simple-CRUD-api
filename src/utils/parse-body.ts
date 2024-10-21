import { type IncomingMessage } from 'node:http';
import { type UserModel } from 'models/user.model';

function isUserModel(user: UserModel): boolean {
  const { username, age, hobbies } = user;
  const allowedProps = ['username', 'age', 'hobbies'];
  if (
    'username' in user &&
    'age' in user &&
    'hobbies' in user &&
    !Object.keys(user).some((key) => !allowedProps.includes(key))
  ) {
    return (
      typeof username === 'string' &&
      typeof age === 'number' &&
      Array.isArray(hobbies) &&
      hobbies.every((element) => typeof element === 'string')
    );
  }
  return false;
}

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
          const user: UserModel = JSON.parse(body);
          if (isUserModel(user)) {
            resolve(user);
          } else {
            throw Error('Invalid user data');
          }
        } catch (error) {
          reject(error);
        }
      });
  });
};
