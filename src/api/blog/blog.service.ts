// src/blog/blog.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw error;
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return this.postModel.find().exec();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).exec();
      console.log(post);
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .exec();

      if (!updatedPost) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return updatedPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: string): Promise<Post> {
    try {
      const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
      if (!deletedPost) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return deletedPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
