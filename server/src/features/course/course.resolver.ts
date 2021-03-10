import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { In, JoinOptions } from 'typeorm';

import { GQLTransformPipe } from '../../helpers/gql-transform.pipe';
import { GqlJoin } from '../../helpers/param-decorators/gql-joins.decorator';
import { CreateCourseInput } from './course.types';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { LessonService } from '../lesson/lesson.service';
import { TagService } from '../tag/tag.service';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private tagService: TagService,
  ) {
  }

  // TODO: access check, get author from current user

  @Mutation(() => Course, { name: 'course' })
  async createCourse(
    @GqlJoin(() => Course) join: JoinOptions,
    @Args('createCourseInput', GQLTransformPipe)
      createCourseInput: CreateCourseInput,
  ): Promise<Course> {
    const { tagIds, ...courseData } = createCourseInput;
    const tags = await this.tagService.find({ where: { id: In(tagIds) } });

    return this.courseService.create(
      { ...courseData, tags },
      { join },
    );
  }

  // TODO: filtering / cursor pagination / sorting

  @Query(() => Course, { name: 'course' })
  async getCourse(
    @Args('id', { type: () => String }) id: string,
    @GqlJoin(() => Course) join: JoinOptions,
  ): Promise<Course> {
    return this.courseService.findOne({ where: { id } }, { join });
  }

  @Query(() => [ Course ], { name: 'courses' })
  getCourses(
    @GqlJoin(() => Course) join: JoinOptions,
  ): Promise<Course[]> {
    return this.courseService.find(
      {},
      { join },
    );
  }
}
