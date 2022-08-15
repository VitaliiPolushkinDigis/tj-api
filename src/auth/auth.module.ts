import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    /* JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '30d' },
    }), */
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
