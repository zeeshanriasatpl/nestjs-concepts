// src/blog/dto/create-blog.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBlogDto } from './create-blog.dto';

export class UpdatePostDto extends CreateBlogDto {
}
