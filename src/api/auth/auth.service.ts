import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

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
    return { user, token };
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
    return { user, token };
  }

  async validateToken(token: string) {
    console.log(token);
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findOne(payload.userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
