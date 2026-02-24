import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { ConfigModule } from '@nestjs/config';
import { DbService } from './db.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [DbService, AppService, UserService, PostService],
})
export class AppModule {}
