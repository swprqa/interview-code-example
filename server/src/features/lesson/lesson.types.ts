import { Field, InputType } from '@nestjs/graphql';

import { LessonContentItemType } from './lesson.entity';

@InputType()
export class LessonContentItemInput {
  @Field(() => LessonContentItemType)
  type: LessonContentItemType;

  @Field()
  text: string;

  @Field()
  src: string;
}

@InputType()
export class LessonContentInput {
  @Field(() => [ LessonContentItemInput ])
  items: LessonContentItemInput[];
}

@InputType()
export class CreateCourseLessonInput {
  @Field()
  name: string;

  @Field(() => LessonContentInput)
  content: LessonContentInput;
}

@InputType()
export class CreateLessonInput {
  @Field()
  name: string;

  @Field()
  course: string;

  @Field(() => LessonContentInput)
  content: LessonContentInput;
}
