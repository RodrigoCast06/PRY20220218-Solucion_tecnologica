import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base';
import { Repository } from 'typeorm';
import { ExerciseCalculation } from './exercise-calculation.entity';
import { CreateExerciseCalculation } from './dto/register-excersice-calculation.dto';
import { PlayerStatisticsService } from 'src/player-statistics/player-statistics.service';
import { PlayerService } from 'src/player/player.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as moment from 'moment';

@Injectable()
export class ExerciseCalculationService extends BaseService<ExerciseCalculation> {
  constructor(
    @InjectRepository(ExerciseCalculation)
    private exerciseCalculationService: Repository<ExerciseCalculation>,
    private playerStatisticsService: PlayerStatisticsService,
    private playerService: PlayerService,
  ) {
    super(exerciseCalculationService);
  }

  private formula(original: number, request: number) {
    return (request * 100) / original;
  }

  //velocidad media, velocidad maxima,sprints
  private sectionA(original: number, request: number) {
    if (original > request) return -100 + this.formula(original, request);
    if (original < request) return -100 + this.formula(original, request);
    if (original === request) return 100 - this.formula(original, request);
    return;
  }

  //distancia recorrida, frecuencia cardiaca, tiempo jugado
  private sectionB(original: number, request: number) {
    if (original > request) return 100 - this.formula(original, request);
    if (original < request) return 100 - this.formula(original, request);
    if (original === request) return 100 - this.formula(original, request);
    return 0;
  }

  async calculation(data: CreateExerciseCalculation) {
    //Validate range between dates
    const start = moment(data.start_date, 'YYYY/MM/DD');
    const end = moment(data.end_date, 'YYYY/MM/DD');
    const diffDays = end.diff(start, 'days');
    if (diffDays !== 7)
      throw new HttpException(
        { message: 'Debe haber una diferencia de 7 días.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    //Validate another calculations
    const calculations = await this.exerciseCalculationService.find({
      where: {
        player: data.player,
      },
    });

    for (const calculation of calculations) {
      const compareStart = moment(calculation.start_date, 'YYYY/MM/DD');
      const compareEnd = moment(calculation.end_date, 'YYYY/MM/DD');
      if (
        start.isBetween(compareStart, compareEnd) ||
        end.isBetween(compareStart, compareEnd) ||
        start.isSame(compareStart) ||
        start.isSame(compareEnd) ||
        end.isSame(compareStart) ||
        end.isSame(compareEnd)
      )
        throw new HttpException(
          { message: 'Registro encontrado dentro del rango.' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }

    //Register calculation
    const player = await this.playerService.findOne(data.player);
    const statistics = await this.playerStatisticsService.getAll();
    const playerStatistics = statistics.find((x) => x.role === player.role);

    const calculated = {
      average_speed_calculated: this.sectionA(
        playerStatistics.average_speed,
        data.average_speed,
      ),
      maximum_speed_calculated: this.sectionA(
        playerStatistics.maximum_speed,
        data.maximum_speed,
      ),
      sprint_calculated: this.sectionA(playerStatistics.sprint, data.sprint),
      traveled_distance_calculated: this.sectionB(
        playerStatistics.traveled_distance,
        data.traveled_distance,
      ),
      average_heart_rate_calculated: this.sectionB(
        playerStatistics.average_heart_rate,
        data.average_heart_rate,
      ),
      time_played_calculated: this.sectionB(
        playerStatistics.time_played,
        data.time_played,
      ),
    };

    let response = null;

    response = await this.exerciseCalculationService.save({
      ...data,
      ...calculated,
      week: calculations.length + 1,
    });

    return response;
  }

  async getPlayerHistory(playerId: string, week?: number) {
    const player = await this.playerService.findOne(playerId);
    const response = await this.exerciseCalculationService.find({
      where: {
        player: playerId,
      },
    });

    return {
      records: !week ? response : response.filter((x) => x.week == week),
      player,
      weeks: response.map((x) => ({
        number: x.week,
        date: `${x.week}(${x.start_date}/${x.end_date})`,
      })),
    };
  }
}
