import { IsNotEmpty } from 'class-validator';

export class CreateExerciseCalculation {
  @IsNotEmpty()
  player: string;

  @IsNotEmpty()
  average_speed: number;

  @IsNotEmpty()
  maximum_speed: number;

  @IsNotEmpty()
  traveled_distance: number;

  @IsNotEmpty()
  average_heart_rate: number;

  @IsNotEmpty()
  sprint: number;

  @IsNotEmpty()
  time_played: number;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;
}
