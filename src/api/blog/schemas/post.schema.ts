import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop()
  content?: string;

  @Prop({ default: false })
  published?: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author?: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
