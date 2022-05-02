/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { SetService } from './set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto) {
    return this.setService.create(createSetDto);
  }

  @Get()
  findAll() {
    return this.setService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    return this.setService.update(+id, updateSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setService.remove(+id);
  }
}
