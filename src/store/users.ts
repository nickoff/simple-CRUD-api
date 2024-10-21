import { type UserModel } from 'models/user.model';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(__dirname, 'db.json');

export class Users {
  private users: UserModel[] = [];

  constructor() {
    void this.readDb();
  }

  private async readDb(): Promise<void> {
    try {
      const fileContent = await fs.readFile(dbPath, 'utf-8');
      this.users = JSON.parse(fileContent);
    } catch (err) {
      const error = err as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') {
        await this.writeDb();
      } else {
        throw err;
      }
    }
  }

  private async writeDb(): Promise<void> {
    await fs.writeFile(dbPath, JSON.stringify(this.users, null, 2), 'utf-8');
  }

  public async addUser(data: UserModel): Promise<UserModel> {
    const user = { id: uuidv4(), ...data };
    this.users = [...this.users, user];
    await this.writeDb();
    return user;
  }

  public async getUsers(): Promise<UserModel[]> {
    await this.readDb();
    return this.users;
  }

  public async getUserById(id: string): Promise<UserModel | undefined> {
    await this.readDb();
    return this.users.find((user) => user.id === id);
  }

  public async deleteUserById(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
    await this.writeDb();
  }

  public async updateUserById(id: string, data: UserModel): Promise<UserModel> {
    this.users = this.users.map((user) => (user.id === id ? { ...user, ...data } : user));
    await this.writeDb();
    return { id, ...data };
  }
}
