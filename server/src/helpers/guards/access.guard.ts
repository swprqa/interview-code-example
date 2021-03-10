import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ACL } from '../../features/role/role.entity';
import { User } from '../../features/user/user.entity';
import { JwtAuthGuard } from './jwt.guard';

export enum AccessType {
  ALL = 'ALL',
  ANY = 'ANY',
}

type AccessesMetadata = {
  type: AccessType;
  accesses: ACL[];
};

export const AccessesRequired = (
  type: AccessType,
  accesses: ACL[],
): (<TFunction extends () => unknown, Y>(
  target: unknown | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    SetMetadata('accesses', { type, accesses }),
    UseGuards(AccessGuard),
  );
};

@Injectable()
class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { type, accesses: requiredAccesses } = this.reflector.get<AccessesMetadata>('accesses', context.getHandler());

    const user: { userData: User } = ctx.getContext().req.user;
    const roles = user.userData.roles;
    const userAccesses = roles.flatMap((role) => role.accesses);

    const hasEveryOfRequired = requiredAccesses.every((requiredAccess) =>
      userAccesses.includes(requiredAccess),
    );

    const hasAnyOfRequired = requiredAccesses.some((requiredAccess) =>
      userAccesses.includes(requiredAccess),
    );

    return (type === AccessType.ALL && hasEveryOfRequired) ||
      (type === AccessType.ANY && hasAnyOfRequired);
  }
}
