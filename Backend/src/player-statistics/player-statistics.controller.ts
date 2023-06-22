import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base';
import { PlayerStatistics } from './player-statistics.entity';
import { PlayerStatisticsService } from './player-statistics.service';

@Controller('player-statistics')
export class PlayerStatisticsController extends BaseController<PlayerStatistics> {
  constructor(private playerStatistics: PlayerStatisticsService) {
    super(playerStatistics);
  }
}
