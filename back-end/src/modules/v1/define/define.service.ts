import { Injectable } from '@nestjs/common';
import { CreateDefineDto } from './dto/create-define.dto';
import { UpdateDefineDto } from './dto/update-define.dto';

@Injectable()
export class DefineService {
  create(createDefineDto: CreateDefineDto) {
    return 'This action adds a new define';
  }

  findAll() {
    return `This action returns all define`;
  }

  findOne(id: number) {
    return `This action returns a #${id} define`;
  }

  update(id: number, updateDefineDto: UpdateDefineDto) {
    return `This action updates a #${id} define`;
  }

  remove(id: number) {
    return `This action removes a #${id} define`;
  }
}
