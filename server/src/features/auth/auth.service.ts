import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../user/user.service';
import { AuthOutput } from './auth.types';
import { AuthenticationConfig, Config } from '../../config/config';
import { User } from '../user/user.entity';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<Config>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {
  }

  createHash(secret: string, salt: string): string {
    const hmac = crypto.createHmac('sha256', salt);

    return hmac.update(secret).digest('hex');
  }

  validateHash(hash1: string, hash2: string): boolean {
    return crypto.timingSafeEqual(
      Buffer.from(hash1),
      Buffer.from(hash2),
    );
  }

  createToken(payload: Record<string, unknown>, config: { secret: string, lifetime: number }): string {
    return this.jwtService.sign(payload, {
      secret: config.secret,
      expiresIn: config.lifetime,
    });
  }

  createHashAndSalt(
    secret: string,
  ): { salt: string; hash: string } {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = this.createHash(secret, salt);

    return { salt, hash };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { email },
      join: { alias: 'user', leftJoinAndSelect: { roles: 'user.roles' } },
    });

    if (user) {
      const passwordHash = this.createHash(password, user.passwordSalt);

      if (this.validateHash(user.passwordHash, passwordHash)) {
        return user;
      }
    }

    return null;
  }

  async login(user: User): Promise<AuthOutput> {
    const { id, email } = user;
    const payload = { id, email, identifier: uuid() };
    const {
      accessToken: accessTokenConfig,
      refreshToken: refreshTokenConfig
    } = this.configService.get<AuthenticationConfig>('authentication');

    const accessToken = this.createToken(payload, accessTokenConfig);
    const refreshToken = this.createToken(payload, refreshTokenConfig);

    const {
      hash: tokenHash,
      salt: tokenSalt,
    } = this.createHashAndSalt(refreshToken);

    await this.refreshTokenRepository.save({
      user,
      tokenHash,
      tokenSalt,
      expiresAt: moment().add(refreshTokenConfig.lifetime, 's')
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
