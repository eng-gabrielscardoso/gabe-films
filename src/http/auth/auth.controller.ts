import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Authenticate with email and password' })
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
