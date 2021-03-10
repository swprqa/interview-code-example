import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.entity';

@InputType()
export class SignUpInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class AuthOutput {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
  @Field()
  user: User;
}

export class JwtPayload {
  id: string;
  email: string;
  identifier: string;
}

export type LocalAuthRequest = Request & {
  body: {
    username: string,
    password: string,
  }
};