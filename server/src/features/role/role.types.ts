import { Field, InputType } from '@nestjs/graphql';

import { ACL } from './role.entity';

@InputType()
export class CreateRoleInput {
  @Field()
  name: string;

  @Field(() => [ ACL ])
  accesses: ACL;
}
