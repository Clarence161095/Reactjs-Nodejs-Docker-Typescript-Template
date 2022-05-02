import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefineService } from './define.service';
import { CreateDefineDto } from './dto/create-define.dto';
import { UpdateDefineDto } from './dto/update-define.dto';

@Controller('define')
export class DefineController {
  constructor(private readonly defineService: DefineService) {}

  @Post()
  create(@Body() createDefineDto: CreateDefineDto) {
    return this.defineService.create(createDefineDto);
  }

  @Get()
  findAll() {
    return this.defineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefineDto: UpdateDefineDto) {
    return this.defineService.update(+id, updateDefineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defineService.remove(+id);
  }
}
