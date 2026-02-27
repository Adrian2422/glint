import { TestBed } from '@suites/unit';
import { describe, it, expect, beforeEach } from 'vitest';
import { DbService } from './db.service';
import { REQUEST } from '@nestjs/core';

describe('DbService', () => {
  let dbService: DbService;
  const mockUser = { id: 'user-1', email: 'test@example.com' };
  const mockRequest = { user: mockUser };

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(DbService)
      .mock(REQUEST)
      .final(mockRequest)
      .compile();

    dbService = unit;
  });

  it('should be defined', () => {
    expect(dbService).toBeDefined();
  });
});
