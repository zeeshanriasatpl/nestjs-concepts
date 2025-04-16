import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Post, PostSchema } from './schemas/post.schema';
import { AuthMiddleware } from 'src/middlewares/auth';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    AuthModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, JwtService],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/blogs/getone/:id',
        method: RequestMethod.GET,
      },
      {
        path: '/blogs/getall',
        method: RequestMethod.GET,
      },
      {
        path: '/blogs/update/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/blogs/delete/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
