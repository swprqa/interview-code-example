import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../auth.types';
import { configuration } from '../../../config/config';

const config = configuration();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authentication.accessToken.secret,
    });
  }

  async validate({ id }: JwtPayload): Promise<any> {
    const user = await this.userService.findOne(
      { where: { id } },
      {
        join: { alias: 'user', leftJoinAndSelect: { roles: 'user.roles' } },
      },
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
