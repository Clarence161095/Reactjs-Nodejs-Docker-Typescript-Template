/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSetDto } from './create-set.dto';

export class UpdateSetDto extends PartialType(CreateSetDto) {}
