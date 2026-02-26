import { DbService } from './db.service';
import { TestBed } from '@suites/unit';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DbService', () => {
  let dbService: DbService;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(DbService).compile();

    dbService = unit;
  });

  it('should be defined', () => {
    expect(dbService).toBeDefined();
  });
});
