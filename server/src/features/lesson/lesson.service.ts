import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lesson } from './lesson.entity';
import { CrudService } from '../../helpers/crud.service';

@Injectable()
export class LessonService extends CrudService<Lesson>{
  constructor(
    @InjectRepository(Lesson)
    protected repository: Repository<Lesson>
  ) {
    super(repository);
  }
}
