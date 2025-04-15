// src/blog/blog.controller.ts

import { Body, Controller, Post, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async createBlog(
    @Query('email') email: string,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blogService.createBlog(email, createBlogDto);
  }
}
