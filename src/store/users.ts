import { type UserModel } from 'models/user.model';
import { v4 as uuidv4 } from 'uuid';

export class Users {
  private users: UserModel[] = [];

  public addUser(data: UserModel): void {
    const user = { id: uuidv4(), ...data };
    this.users = [...this.users, user];
  }

  public getUsers(): UserModel[] {
    return this.users;
  }

  public getUserById(id: string): UserModel | undefined {
    return this.users.find((user) => user.id === id);
  }

  public deleteUserById(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public updateUserById(id: string, data: UserModel): void {
    this.users = this.users.map((user) => (user.id === id ? { ...user, ...data } : user));
  }
}
