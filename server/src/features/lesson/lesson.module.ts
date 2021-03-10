import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lesson, LessonContentScalar } from './lesson.entity';
import { LessonService } from './lesson.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Lesson ]) ],
  providers: [ LessonContentScalar, LessonService ],
  exports: [ LessonService ],
})
export class LessonModule {
}
