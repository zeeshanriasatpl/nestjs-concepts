// src/blog/blog.service.ts

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createBlog(dto: CreateBlogDto): Promise<Post> {
    try {
      const createdPost = new this.postModel({
        title: dto.title,
        content: dto.content,
      });
      return createdPost.save();
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return this.postModel.find().exec();
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).exec();
      console.log(post);
      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Post with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return post;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .exec();

      if (!updatedPost) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Post with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedPost;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Post> {
    try {
      const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
      if (!deletedPost) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Post with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return deletedPost;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
