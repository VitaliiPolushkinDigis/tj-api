import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //if validate() is ok allow code below
  @Post('login')
  async login(@Request() req) {
    console.log('req.user', req.user);

    return this.authService.login(req.user);
  }

  /*   @UseGuards(JwtAuthGuard) //check if authorized
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  } */

  @UseGuards(JwtAuthGuard) //check if authorized
  @Post('decoratorme')
  getProfileCustom(@User('user') user: UserEntity) {
    console.log('--------2user', user);

    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
