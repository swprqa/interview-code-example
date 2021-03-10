import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refresh-token') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}