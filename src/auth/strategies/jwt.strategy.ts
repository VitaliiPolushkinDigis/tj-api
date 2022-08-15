import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userService.findByEmail({
      email: payload.email,
    });
    if (!user) {
      throw new UnauthorizedException('No access for this page!');
    }

    return {
      id: payload.sub,
      email: payload.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
