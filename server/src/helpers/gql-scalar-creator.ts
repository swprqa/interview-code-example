// https://github.com/HorusGoul/nest-graphql-scalar-adapter/blob/main/src/graphql-scalar-adapter.ts
import { CustomScalar, ReturnTypeFunc, Scalar } from '@nestjs/graphql';
import * as tslib from 'tslib';
import type { Type } from '@nestjs/common';
import type { GraphQLScalarType } from 'graphql';

export function createFromGraphQLScalar<T = unknown, K = unknown>(
  {
    scalar,
    type,
    name = scalar.name,
  }: {
    scalar: GraphQLScalarType,
    type?: ReturnTypeFunc,
    name?: string,
  },
): Type<CustomScalar<T, K>> {
  type ScalarType = CustomScalar<T, K>;

  const className = `${name}AdaptedScalar`;

  const proxyObject = {
    [className]: class {
      description = scalar.description ?? undefined;

      parseValue(
        ...params: Parameters<ScalarType['parseValue']>
      ): ReturnType<ScalarType['parseValue']> {
        return scalar.parseValue.bind(scalar)(...params);
      }

      serialize(
        ...params: Parameters<ScalarType['serialize']>
      ): ReturnType<ScalarType['serialize']> {
        return scalar.serialize.bind(scalar)(...params);
      }

      parseLiteral(
        ...params: Parameters<ScalarType['parseLiteral']>
      ): ReturnType<ScalarType['parseLiteral']> {
        return scalar.parseLiteral.bind(scalar)(...params);
      }
    },
  };

  return tslib.__decorate(
    [ Scalar(name, type) ],
    proxyObject[className],
  );
}
