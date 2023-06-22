import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseEntity } from './base.entity';

export class BaseController<T extends BaseEntity> {
  constructor(
    private entityService: BaseService<T>,
    private flgName: boolean = false,
  ) {}

  @Get()
  async getAll() {
    return await this.entityService.getAll();
  }

  @Post()
  async createOne(@Body() entity: any) {
    return await this.entityService.createOne(entity, this.flgName);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.entityService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.entityService.deleteOne(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() entity: any) {
    return await this.entityService.updateOne(id, entity);
  }
}
