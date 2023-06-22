import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base';
import { PlayerStatistics } from './player-statistics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerStatisticsService extends BaseService<PlayerStatistics> {
  constructor(
    @InjectRepository(PlayerStatistics)
    private playerStatistics: Repository<PlayerStatistics>,
  ) {
    super(playerStatistics);
  }
}
