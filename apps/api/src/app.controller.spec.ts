import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, type Mocked } from '@suites/unit';
import { AppController } from './app.controller';
import { PostService } from './post.service';
import { UserService } from './user.service';

describe('AppController', () => {
  let appController: AppController;
  let postService: Mocked<PostService>;
  let userService: Mocked<UserService>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(AppController).compile();

    appController = unit;
    postService = unitRef.get(PostService);
    userService = unitRef.get(UserService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
