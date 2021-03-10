import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,

} from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { Lesson } from '../lesson/lesson.entity';

@Entity('courses')
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  coverSrc: string;

  @Column({ type: 'bool', default: false })
  @Field(() => Boolean, { defaultValue: false })
  isPublished: boolean;

  @ManyToMany(() => Tag, (tag) => tag.courses, { cascade: [ 'insert' ] })
  @Field(() => [ Tag ], { defaultValue: [] })
  @JoinTable({ name: 'relations_courseTags' })
  tags: Tag[];

  @OneToMany(() => Lesson, (lesson) => lesson.course, { cascade: [ 'insert' ] })
  @Field(() => [ Lesson ], { defaultValue: [] })
  lessons: Lesson[];

  @OneToMany(() => Comment, (comment) => comment.course)
  @Field(() => [ Comment ], { defaultValue: [] })
  comments: Comment[];

  @ManyToOne(() => User)
  @Field(() => User, { defaultValue: [] })
  author: User;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
