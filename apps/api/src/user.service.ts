import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { User } from '../zenstack/models';
import {
  UserCreateArgs,
  UserDeleteArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
  UserUpdateArgs,
} from '../zenstack/input';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async user(params: UserFindUniqueArgs): Promise<User | null> {
    return this.dbService.user.findUnique(params);
  }

  async users(params: UserFindManyArgs): Promise<User[]> {
    return this.dbService.user.findMany(params);
  }

  async createUser(params: UserCreateArgs): Promise<User> {
    return this.dbService.user.create(params);
  }

  async updateUser(params: UserUpdateArgs): Promise<User> {
    return this.dbService.user.update(params);
  }

  async deleteUser(params: UserDeleteArgs): Promise<User> {
    return this.dbService.user.delete(params);
  }
}
