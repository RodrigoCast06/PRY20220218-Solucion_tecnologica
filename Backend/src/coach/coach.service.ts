import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base';
import { Repository } from 'typeorm';
import { Coach } from './coach.entity';

@Injectable()
export class CoachService extends BaseService<Coach> {
  constructor(
    @InjectRepository(Coach)
    private coachService: Repository<Coach>,
  ) {
    super(coachService);
  }
}
