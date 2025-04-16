import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = await this.userService.create({
      ...signupDto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ userId: user._id.toString() });
    return { 
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }, 
      token 
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user._id.toString() });
    return { 
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }, 
      token 
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token);
      const user = await this.userService.findById(decoded.userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
