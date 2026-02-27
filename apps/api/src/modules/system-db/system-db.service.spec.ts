import { TestBed } from '@suites/unit';
import { describe, it, expect, beforeEach } from 'vitest';
import { SystemDbService } from './system-db.service';

describe('SystemDbService', () => {
  let systemDbService: SystemDbService;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(SystemDbService).compile();

    systemDbService = unit;
  });

  it('should be defined', () => {
    expect(systemDbService).toBeDefined();
  });
});
