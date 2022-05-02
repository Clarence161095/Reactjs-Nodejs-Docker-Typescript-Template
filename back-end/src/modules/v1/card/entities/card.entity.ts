/* eslint-disable comma-dangle */
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Card extends BaseEntity {
  // Own info
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false, type: String })
  term: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false, type: String })
  define: string;

  @ApiProperty({ type: Number })
  @Column({ nullable: false, type: Number })
  process: number;

  // Relationship
  @ApiProperty({ type: String })
  @Column({ nullable: false, type: 'uuid' })
  user_id: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false, type: 'uuid' })
  set_id: string;

  // Auto Generations properties
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
