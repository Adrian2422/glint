import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Session } from 'zenstack/models';
import {
  SessionCreateArgs,
  SessionDeleteArgs,
  SessionFindFirstArgs,
  SessionFindManyArgs,
  SessionFindUniqueArgs,
  SessionUpdateArgs,
} from 'zenstack/input';

@Injectable()
export class SessionsService {
  constructor(private readonly dbService: DbService) {}

  async findUnique(params: SessionFindUniqueArgs): Promise<Session | null> {
    return this.dbService.session.findUnique(params);
  }

  async findFirst(params: SessionFindFirstArgs): Promise<Session | null> {
    return this.dbService.session.findFirst(params);
  }

  async findMany(params: SessionFindManyArgs): Promise<Session[]> {
    return this.dbService.session.findMany(params);
  }

  async create(params: SessionCreateArgs): Promise<Session> {
    return this.dbService.session.create(params);
  }

  async update(params: SessionUpdateArgs): Promise<Session> {
    return this.dbService.session.update(params);
  }

  async delete(params: SessionDeleteArgs): Promise<Session> {
    return this.dbService.session.delete(params);
  }
}
