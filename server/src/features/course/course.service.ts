import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './course.entity';
import { CrudService } from '../../helpers/crud.service';

@Injectable()
export class CourseService extends CrudService<Course> {
  constructor(
    @InjectRepository(Course)
    protected repository: Repository<Course>
  ) {
    super(repository);
  }
}
