import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/api/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const tokenData = await this.jwtService.verify(token);
      if (!tokenData) {
        throw new UnauthorizedException('Invalid token, User not authorized');
      }

      const user = await this.authService.validateToken(token);
      if (!user) {
        throw new UnauthorizedException('User not authorized');
      }

      (req as any).user = user;
      next();
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException('Invalid token');
    }
  }
}
