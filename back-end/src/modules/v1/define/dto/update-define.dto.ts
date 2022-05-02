import { PartialType } from '@nestjs/mapped-types';
import { CreateDefineDto } from './create-define.dto';

export class UpdateDefineDto extends PartialType(CreateDefineDto) {}
