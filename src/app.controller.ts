import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from './login.dto';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { RegisterDto } from './register.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    if (!(await this.userService.isEmailAvailable(registerDto.email))) {
      throw new NotAcceptableException('Email already registered');
    }
    const user = await this.userService.register(registerDto);
    return { user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const jwt = await this.userService.login(loginDto);
    if (!jwt) {
      throw new UnauthorizedException('Email/Password is incorrect');
    }
    return { jwt };
  }

  @Get('user')
  getUser(@Req() req: Request): any {
    return req.user;
  }
}
