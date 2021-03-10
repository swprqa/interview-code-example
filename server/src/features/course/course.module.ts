import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course } from './course.entity';
import { LessonModule } from '../lesson/lesson.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ Course ]), LessonModule, TagModule ],
  providers: [ CourseService, CourseResolver ],
  exports: [ CourseService ],
})
export class CourseModule {
}
