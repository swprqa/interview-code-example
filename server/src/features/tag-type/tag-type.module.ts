import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagType } from './tag-type.entity';
import { TagTypeService } from './tag-type.service';
import { TagTypeResolver } from './tag-type.resolver';

@Module({
  imports: [ TypeOrmModule.forFeature([ TagType ]) ],
  providers: [ TagTypeService, TagTypeResolver ],
  exports: [ TagTypeService ],
})
export class TagTypeModule {
}
