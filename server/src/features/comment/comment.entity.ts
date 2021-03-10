import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../course/course.entity';

@Entity('comments')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  content: string;

  @ManyToMany(() => Course, (course) => course.comments, { nullable: true })
  @Field(() => Course, { defaultValue: null })
  course: Course;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
