import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DataQueryOptions } from './types/data-query-options.types';

export class CrudService<Entity extends { id: string }> {
  constructor(
    protected repository: Repository<Entity>,
  ) {
  }

  async findOne(
    criteria: FindOneOptions<Entity>,
    dataQueryOptions?: DataQueryOptions,
  ): Promise<Entity> {
    return this.repository.findOne({
      ...criteria,
      ...(dataQueryOptions || {}),
    });
  }

  async find(
    criteria: FindManyOptions<Entity>,
    dataQueryOptions?: DataQueryOptions,
  ): Promise<Entity[]> {
    return this.repository.find({
      ...criteria,
      ...(dataQueryOptions || {}),
    });
  }

  async create(
    data: DeepPartial<Entity>,
    dataQueryOptions?: DataQueryOptions,
  ): Promise<Entity> {
    const result = await this.repository.save(data);

    if (!dataQueryOptions) {
      return result;
    }

    return this.repository.findOne({
      ...dataQueryOptions,
      where: { id: result.id },
    });
  }

  async update(
    criteria: FindConditions<Entity>,
    data: DeepPartial<Entity>,
    dataQueryOptions?: DataQueryOptions,
  ): Promise<Entity> {
    await this.repository.update(criteria, data);

    return this.repository.findOne({
      ...criteria,
      ...(dataQueryOptions || {}),
    });
  }
}