import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { Post } from 'zenstack/models';
import {
  PostCreateArgs,
  PostDeleteArgs,
  PostFindManyArgs,
  PostFindUniqueArgs,
  PostUpdateArgs,
} from 'zenstack/input';

@Injectable()
export class PostService {
  constructor(private readonly dbService: DbService) {}

  async post(params: PostFindUniqueArgs): Promise<Post | null> {
    return this.dbService.post.findUnique(params);
  }

  async posts(params: PostFindManyArgs): Promise<Post[]> {
    return this.dbService.post.findMany(params);
  }

  async createPost(data: PostCreateArgs): Promise<Post> {
    return this.dbService.post.create(data);
  }

  async updatePost(params: PostUpdateArgs): Promise<Post> {
    return this.dbService.post.update(params);
  }

  async deletePost(params: PostDeleteArgs): Promise<Post> {
    return this.dbService.post.delete(params);
  }
}
