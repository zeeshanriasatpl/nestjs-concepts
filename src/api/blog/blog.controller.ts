// src/blog/blog.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdatePostDto } from './dto/update-post.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('blogs')
@ApiBearerAuth('jwt')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('editor')
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog successfully created.' })
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'Return all blogs.' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get('getone/:id')
  @ApiOperation({ summary: 'Get a single blog' })
  @ApiResponse({ status: 200, description: 'Return a single blog.' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(RolesGuard)
  @Roles('editor')
  @ApiOperation({ summary: 'Update a blog' })
  @ApiResponse({ status: 200, description: 'Blog successfully updated.' })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.blogService.updatePost(id, updatePostDto);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles('editor')
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiResponse({ status: 200, description: 'Blog successfully deleted.' })
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
