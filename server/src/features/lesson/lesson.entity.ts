import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import GraphQLJSON from 'graphql-type-json';
import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Course } from '../course/course.entity';
import { createFromGraphQLScalar } from '../../helpers/gql-scalar-creator';

export enum LessonContentItemType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  TAB = 'TAB',
}

registerEnumType(LessonContentItemType, {
  name: 'LessonContentItemType',
  description: 'List content types allowed inside lesson',
});

@ObjectType()
export class LessonContentItem {
  @Field(() => LessonContentItemType)
  type: LessonContentItemType;
  @Field()
  text: string;
  @Field()
  src: string;
}

@ObjectType()
export class LessonContent {
  @Field(() => [ LessonContentItem ])
  items: LessonContentItem[];
}

export const LessonContentScalar = createFromGraphQLScalar({
  scalar: GraphQLJSON,
  type: () => LessonContent,
});

@Entity('lessons')
@ObjectType()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'json', nullable: true })
  @Field(() => LessonContent, { nullable: true })
  content: LessonContent;

  @ManyToOne(() => Course, (course) => course.lessons, { nullable: false })
  @Field(() => Course, { nullable: false })
  course: Course;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
