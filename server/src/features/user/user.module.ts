import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ User ]), RoleModule ],
  providers: [ UserService, UserResolver ],
  exports: [ UserService ],
})
export class UserModule {
}
