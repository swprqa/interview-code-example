import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { LocalAuthRequest } from '../../features/auth/auth.types';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext): LocalAuthRequest {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    request.body = ctx.getArgs();

    return request;
  }
}
