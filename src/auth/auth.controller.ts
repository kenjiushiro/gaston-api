import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from '../guards/Public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() signupDto: CreateUserDto) {
    return this.authService.signUp(signupDto);
  }
}
