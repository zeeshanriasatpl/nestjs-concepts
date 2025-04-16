import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './api/blog/blog.module';
import { UserModule } from './api/user/user.module';
import { MongooseConfigModule } from './config/mongoose.config';

@Module({
  imports: [
    MongooseConfigModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    BlogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
