import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //if validate() is ok allow code below
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /*   @UseGuards(JwtAuthGuard) //check if authorized
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  } */

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
