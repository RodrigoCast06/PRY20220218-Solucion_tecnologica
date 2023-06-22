import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/base';
import { ExerciseCalculation } from './exercise-calculation.entity';
import { ExerciseCalculationService } from './exercise-calculation.service';
import { CreateExerciseCalculation } from './dto/register-excersice-calculation.dto';

@Controller('exercise-calculation')
export class ExerciseCalculationController extends BaseController<ExerciseCalculation> {
  constructor(private exerciseCalculationService: ExerciseCalculationService) {
    super(exerciseCalculationService);
  }

  @Post()
  async calculation(@Body() dto: CreateExerciseCalculation) {
    const data = this.exerciseCalculationService.calculation(dto);
    return data;
  }

  //player, week
  @Get('record')
  async getPlayerHistory(
    @Query('player') player: string,
    @Query('week') week?: number,
  ) {
    const data = this.exerciseCalculationService.getPlayerHistory(player, week);
    return data;
  }
}
