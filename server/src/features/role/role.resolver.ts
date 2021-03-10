import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLTransformPipe } from '../../helpers/gql-transform.pipe';
import { Role } from './role.entity';
import { CreateRoleInput } from './role.types';
import { GqlJoin } from '../../helpers/param-decorators/gql-joins.decorator';
import { JoinOptions } from 'typeorm';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {
  }

  @Mutation(() => Role, { name: 'role' })
  createRole(
    @Args('createRoleInput', GQLTransformPipe) createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [ Role ], { name: 'roles' })
  getRoles(
    @GqlJoin(() => Role) join: JoinOptions
  ): Promise<Role[]> {
    return this.roleService.find({}, { join });
  }
}
