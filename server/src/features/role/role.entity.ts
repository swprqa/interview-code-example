import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql';

import { User } from '../user/user.entity';

export enum ACL {
  DEFAULT = 'DEFAULT',
  ROLES_MANAGE = 'ROLES_MANAGE',
  USER_ROLE_MANAGE = 'USER_ROLE_MANAGE',
  TAGS_MANAGE = 'TAGS_MANAGE',
  LESSONS_MANAGE = 'LESSONS_MANAGE',
  COURSES_MANAGE = 'COURSES_MANAGE',
  COMMENTS_MANAGE = 'COMMENTS_MANAGE',
}

registerEnumType(ACL, {
  name: 'ACL',
  description: 'List of Access Control properties',
});

@Entity('roles')
@Unique([ 'name' ])
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({
    type: 'enum',
    enum: ACL,
    enumName: 'acl',
    array: true,
    default: [ ACL.DEFAULT ],
  })
  @Field(() => [ ACL ])
  accesses: ACL;

  @ManyToMany(() => User, (user) => user.roles)
  @Field(() => [ User ], { defaultValue: [] })
  @JoinTable({ name: 'relations_userRoles' })
  users: User[];

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
