import { Query, Resolver } from '@nestjs/graphql';

import { GqlJoin } from '../../helpers/param-decorators/gql-joins.decorator';
import { JoinOptions } from 'typeorm';
import { TagType } from './tag-type.entity';
import { TagTypeService } from './tag-type.service';

@Resolver(() => TagType)
export class TagTypeResolver {
  constructor(
    private tagTypeService: TagTypeService,
  ) {
  }

  @Query(() => [ TagType ], { name: 'tagTypes' })
  async getTagTypes(
    @GqlJoin(() => TagType) join: JoinOptions
  ): Promise<TagType[]> {
    return this.tagTypeService.find({}, { join });
  }
}