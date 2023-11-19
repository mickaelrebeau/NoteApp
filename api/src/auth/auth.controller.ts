import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/sigup.dto';
import { SigninDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @Post('/signin')
  async signIn(@Body() body: SigninDto) {
    return await this.authService.signin(body);
  }
}
