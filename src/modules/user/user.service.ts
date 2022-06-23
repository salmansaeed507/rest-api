import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/login.dto';
import { RegisterDto } from 'src/register.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
const md5 = require('md5');
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });
    return user ? false : true;
  }

  public register(data: RegisterDto): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.password = md5(data.password);
    return this.usersRepository.save(user);
  }

  public async login(data: LoginDto): Promise<string | boolean> {
    const user = await this.usersRepository.findOneBy({
      email: data.email,
      password: md5(data.password),
    });
    if (!user) {
      return false;
    }
    return this.jwt(user);
  }

  private jwt(user: User) {
    return this.jwtService.sign({ email: user.email });
  }

  public async auth(jwt: string): Promise<User | boolean> {
    try {
      this.jwtService.verify(jwt);
      const data = this.jwtService.decode(jwt, { json: true });
      const user: User = await this.usersRepository.findOneBy({
        email: data['email'],
      });
      return user;
    } catch (e) {
      return false;
    }
  }
}
