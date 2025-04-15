// src/blog/blog.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async createBlog(email: string, dto: CreateBlogDto) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId: user.id,
      },
    });

    return post;
  }
}
