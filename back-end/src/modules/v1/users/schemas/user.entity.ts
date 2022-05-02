import { RolesEnum } from '@decorators/roles.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column, Entity, Index, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string = '';

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  readonly password: string = '';

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  readonly email: string = '';

  @ApiProperty({ type: Boolean })
  @Column()
  readonly verified: boolean = false;

  @ApiProperty({ type: String, default: RolesEnum.user, enum: RolesEnum })
  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.user })
  readonly role: RolesEnum = RolesEnum.user;
}
