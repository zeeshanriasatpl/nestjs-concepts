import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './api/blog/blog.controller';
import { BlogService } from './api/blog/blog.service';
import { BlogModule } from './api/blog/blog.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [PrismaModule, BlogModule, UserModule],
  controllers: [AppController, BlogController],
  providers: [AppService, BlogService],
})
export class AppModule {}
