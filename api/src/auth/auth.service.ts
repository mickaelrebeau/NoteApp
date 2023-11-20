import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dtos/sigup.dto';
import { SigninDto } from './dtos/signin.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: SignupDto): Promise<User> {
    const userExist = await this.userService.getByUsername(user.username);
    const emailExist = await this.userService.getByEmail(user.email);

    if (userExist || emailExist) {
      throw new Error('User already exist');
    }

    const hash = await this.hashData(user.password);

    return await this.userService.create({
      ...user,
      password: hash,
    });
  }

  async signin(body: SigninDto) {
    const user = await this.userService.getByEmail(body.email);
    const passwordMatches = await argon2.verify(user.password, body.password);

    if (user.email !== body.email || !passwordMatches) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      id: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
