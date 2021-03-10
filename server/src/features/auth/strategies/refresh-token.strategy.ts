import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '../refresh-token.entity';
import { configuration } from '../../../config/config';
import { User } from 'src/features/user/user.entity';

const config = configuration();
const { refreshToken: refreshTokenConfig } = config.authentication;

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {
    super({
      passReqToCallback: true,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromHeader(refreshTokenConfig.headerName),
      secretOrKey: refreshTokenConfig.secret,
    });
  }

  async validate(req: Request, { id }: JwtPayload): Promise<User> {
    // TODO: check token identifier in revoked token list

    const refreshTokenFromRequest = req.headers[refreshTokenConfig.headerName];
    const user = await this.userService.findOne({
      where: { id },
      join: { alias: 'user', leftJoinAndSelect: { roles: 'user.roles' } },
    });

    if (user) {
      const refreshToken = await this.refreshTokenRepository.findOne({
        where: { user },
      });

      if (refreshToken) {
        const tokenHash = this.authService.createHash(refreshTokenFromRequest, refreshToken.tokenSalt);

        if (this.authService.validateHash(tokenHash, refreshToken.tokenHash)) {
          return user;
        }
      }
    }

    throw new UnauthorizedException();
  }
}
