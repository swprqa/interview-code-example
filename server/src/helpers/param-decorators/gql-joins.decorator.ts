import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';
import { EntityTarget, getManager, JoinOptions } from 'typeorm';

const getNestedRecursive = (fragment, parent) => {
  const fields = Object.values(fragment)[0];

  if (!fields) return [];

  return [
    ...Object.values(fields).reduce((acc, value) => {
      if (Object.keys(value.fieldsByTypeName).length > 0) {
        return [
          ...acc,
          `${parent ? `${parent}.` : ''}${value.alias}`,
          ...getNestedRecursive(value.fieldsByTypeName, value.alias),
        ];
      }
      return acc;
    }, []),
  ];
};

export const GqlJoin = createParamDecorator(
  (
    data: () => EntityTarget<unknown>,
    context: ExecutionContext,
  ): JoinOptions => {
    const ctx = GqlExecutionContext.create(context);
    const tableName = getManager().getRepository(data()).metadata.tableName;
    const info = ctx.getInfo();
    const parsedResolveInfoFragment = parseResolveInfo(info) as ResolveTree;
    const simplifiedFragment = simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment,
      info.returnType,
    );
    const { fields } = simplifiedFragment;

    return {
      alias: tableName,
      leftJoinAndSelect: getNestedRecursive({ fields }, '').reduce(
        (acc, fieldPath) => {
          const [ parent, child ] = fieldPath.split('.');
          return {
            ...acc,
            ...(child
              ? { [child]: fieldPath }
              : { [parent]: `${tableName}.${parent}` }),
          };
        },
        {},
      ),
    };
  },
);
