import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

import { Role } from '../role/role.entity';

export enum UserStatus {
  REGISTERED = 'REGISTERED',
  APPROVED = 'APPROVED',
  SUSPENDED = 'SUSPENDED',
}

@Entity('users')
@Unique([ 'email' ])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Index()
  @Column()
  @Field()
  email: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column()
  @Exclude()
  passwordSalt: string;

  @Column({ nullable: false, default: UserStatus.REGISTERED })
  @Field({ defaultValue: UserStatus.REGISTERED })
  status: UserStatus;

  @ManyToMany(() => Role, (role) => role.users)
  @Field(() => [ Role ], { defaultValue: [] })
  roles: Role[];

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
