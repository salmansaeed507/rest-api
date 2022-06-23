import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private request;

  constructor(private readonly userService: UserService) {}

  async use(req: any, res: Response, next: NextFunction) {
    this.request = req;
    let header = req.header('Authorization');
    if (!header) {
      throw new UnauthorizedException('Invalid token');
    }
    header = header.substring(7, header.length);
    const user = await this.userService.auth(header);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    this.request.user = user;
    next();
  }
}
