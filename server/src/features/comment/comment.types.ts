import { Field, InputType, PickType } from '@nestjs/graphql';

import { Comment } from './comment.entity';

@InputType()
export class CreateCommentInput extends PickType(Comment, [ 'content' ]) {
  @Field()
  course: string;
}
