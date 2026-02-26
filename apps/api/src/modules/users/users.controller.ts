import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'zenstack/models';
import { UserCreateArgs, type UserUpdateArgs } from '../../../zenstack/input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findMany({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUnique({ where: { id } });
  }

  @Post()
  async create(@Body() data: UserCreateArgs['data']): Promise<User> {
    return this.usersService.create({ data });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UserUpdateArgs['data'],
  ): Promise<User> {
    console.log('###', data);

    return this.usersService.update({ where: { id }, data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete({ where: { id } });
  }
}
