import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from 'src/common/interface/request';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    let tokenData = null;
    if (token) {
      tokenData = this.jwtService.decode(token);
    }

    if (!tokenData) {
      throw new UnauthorizedException('Invalid token, User not authorized');
    }

    // const user = await this.userModel.findById(tokenData.userId).exec();

    // if (!user) {
    //   throw new UnauthorizedException('User not authorized');
    // }
    // req.user = user;

    next();
  }
}
