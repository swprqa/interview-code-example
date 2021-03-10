import { Field, InputType } from '@nestjs/graphql';

import { CreateCourseLessonInput } from '../lesson/lesson.types';

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  coverSrc: string;

  @Field(() => Boolean, { defaultValue: false })
  isPublished: boolean;

  @Field(() => [ String ], { defaultValue: [] })
  tagIds: string[];

  @Field(() => [ CreateCourseLessonInput ], { defaultValue: [] })
  lessons: CreateCourseLessonInput[];
}
