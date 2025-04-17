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
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('No token provided');
      }

      const token = authHeader.split(' ')[1];
      console.log('token ---1 > ', token);
      const user = await this.authService.validateToken(token);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Attach the complete user object to the request
      (req as any).user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      };

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
