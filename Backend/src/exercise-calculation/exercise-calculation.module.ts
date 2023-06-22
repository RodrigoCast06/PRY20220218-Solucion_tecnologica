import { Module, forwardRef } from '@nestjs/common';
import { ExerciseCalculationController } from './exercise-calculation.controller';
import { ExerciseCalculationService } from './exercise-calculation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseCalculation } from './exercise-calculation.entity';
import { PlayerStatisticsModule } from 'src/player-statistics/player-statistics.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseCalculation]),
    forwardRef(() => PlayerStatisticsModule),
    forwardRef(() => PlayerModule),
  ],
  controllers: [ExerciseCalculationController],
  providers: [ExerciseCalculationService],
})
export class ExerciseCalculationModule {}
