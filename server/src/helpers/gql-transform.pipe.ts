import { PipeTransform } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

export class GQLTransformPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return classToPlain(value);
  }
}
