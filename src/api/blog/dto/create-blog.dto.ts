// src/blog/dto/create-blog.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: 'author_id' })
  @IsNotEmpty()
  @IsString()
  author: string;
}
