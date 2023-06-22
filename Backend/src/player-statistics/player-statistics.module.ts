import { Module } from '@nestjs/common';
import { PlayerStatisticsController } from './player-statistics.controller';
import { PlayerStatisticsService } from './player-statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerStatistics } from './player-statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerStatistics])],
  controllers: [PlayerStatisticsController],
  providers: [PlayerStatisticsService],
  exports: [PlayerStatisticsService],
})
export class PlayerStatisticsModule {}
