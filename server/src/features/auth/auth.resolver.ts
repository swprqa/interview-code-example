import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthOutput, SignUpInput } from './auth.types';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LocalAuthGuard } from '../../helpers/guards/local.guard';
import { CurrentUser } from '../../helpers/param-decorators/current-user';
import { RefreshTokenAuthGuard } from '../../helpers/guards/refresh-token.guard';
import { GQLTransformPipe } from '../../helpers/gql-transform.pipe';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthOutput, { name: 'signIn' })
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
    @CurrentUser() user: User,
  ): Promise<AuthOutput> {
    return this.authService.login(user);
  }

  @Mutation(() => AuthOutput, { name: 'signUp' })
  async signUp(
    @Args('signUpData', GQLTransformPipe) signUpData: SignUpInput,
  ): Promise<AuthOutput> {
    const { password, ...data } = signUpData;

    // TODO: validation

    const { hash: passwordHash, salt: passwordSalt } = this.authService.createHashAndSalt(password);

    const user = await this.userService.create({
      ...data,
      passwordHash,
      passwordSalt,
    });

    return this.authService.login(user);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Mutation(() => AuthOutput, { name: 'refresh' })
  async refresh(
    @CurrentUser() user: User,
  ): Promise<AuthOutput> {
    return this.authService.login(user);
  }
}
