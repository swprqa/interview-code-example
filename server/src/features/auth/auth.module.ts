import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { RefreshToken } from './refresh-token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ RefreshToken ]),
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [ AuthService, JwtStrategy, AuthResolver, LocalStrategy, RefreshTokenStrategy ],
  exports: [ AuthService ],
})
export class AuthModule {
}
