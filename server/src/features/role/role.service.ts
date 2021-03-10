import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { CrudService } from '../../helpers/crud.service';

@Injectable()
export class RoleService extends CrudService<Role>{
  constructor(
    @InjectRepository(Role)
    protected repository: Repository<Role>
  ) {
    super(repository);
  }
}
