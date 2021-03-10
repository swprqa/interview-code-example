import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from './tag.entity';
import { CrudService } from '../../helpers/crud.service';

@Injectable()
export class TagService extends CrudService<Tag> {
  constructor(
    @InjectRepository(Tag)
    protected repository: Repository<Tag>,
  ) {
    super(repository);
  }
}
