import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../course/course.entity';
import { TagType } from '../tag-type/tag-type.entity';

@Entity('tags')
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => TagType)
  @Field(() => TagType)
  type: TagType;

  @ManyToMany(() => Course, (course) => course.tags)
  @Field(() => [ Course ], { defaultValue: [] })
  courses: Course[];

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
