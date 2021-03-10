import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagType } from './tag-type.entity';
import { CrudService } from '../../helpers/crud.service';

@Injectable()
export class TagTypeService extends CrudService<TagType> {
  constructor(
    @InjectRepository(TagType)
    protected repository: Repository<TagType>,
  ) {
    super(repository);
  }
}
