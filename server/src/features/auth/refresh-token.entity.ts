import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

// TODO: add multiple device support

@Entity('refreshToken')
@Unique('USER_TOKEN', [ 'user' ])
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  tokenHash: string;

  @Column()
  tokenSalt: string;

  @Column({ nullable: false, type: 'timestamp with time zone' })
  expiresAt: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  updatedAt: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  createdAt: Date;
}
