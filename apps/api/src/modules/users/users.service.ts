import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  UserCreateArgs,
  UserDeleteArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
  UserUpdateArgs,
} from 'zenstack/input';
import * as bcrypt from 'bcrypt';
import { User } from '../../../zenstack/models';
import { UserWithPassword } from '../../common/types/user-with-password.type';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async findUnique(params: UserFindUniqueArgs): Promise<User | null> {
    return this.dbService.user.findUnique(params);
  }

  async findUniqueWithPassword(
    params: UserFindUniqueArgs,
  ): Promise<UserWithPassword | null> {
    return this.dbService.user.findUnique({
      ...params,
      omit: { password: false },
    });
  }

  async findMany(params: UserFindManyArgs): Promise<User[]> {
    return this.dbService.user.findMany(params);
  }

  async create(params: UserCreateArgs): Promise<User> {
    const hashedPassword = await bcrypt.hash(params.data.password, 10);

    return this.dbService.user.create({
      ...params,
      data: {
        ...params.data,
        password: hashedPassword,
      },
    });
  }

  async update(params: UserUpdateArgs): Promise<User> {
    const data = { ...params.data };
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.dbService.user.update({
      ...params,
      data,
    });
  }

  async delete(params: UserDeleteArgs): Promise<User> {
    return this.dbService.user.delete(params);
  }
}
