import { FindManyOptions, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectID } from 'mongodb';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class BaseService<T extends BaseEntity> {
  constructor(private entityRepository: Repository<T>) {}

  async getAll() {
    return await this.entityRepository.find({});
  }

  async createOne(entity: any, flgName = false) {
    if (flgName) {
      const find = await this.entityRepository.findOneBy({
        name: entity.name,
      } as any);

      if (find) throw new HttpException('Element exists', HttpStatus.FORBIDDEN);
    }
    return await this.entityRepository.save(entity);
  }

  async findOne(_id: any) {
    return await this.entityRepository.findOneBy({ _id: new ObjectID(_id) });
  }

  async deleteOne(_id: any) {
    return await this.entityRepository.delete({ _id: new ObjectID(_id) });
  }

  async updateOne(_id: any, entity: any) {
    return await this.entityRepository.update(
      { _id: new ObjectID(_id) },
      entity,
    );
  }

  async findBy(options: FindManyOptions<T>) {
    return await this.entityRepository.find(options);
  }
}
