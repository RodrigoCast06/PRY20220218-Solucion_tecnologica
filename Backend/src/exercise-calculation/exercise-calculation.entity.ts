import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('exercise-calculations')
export class ExerciseCalculation {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ name: 'average_speed' })
  average_speed: number;

  @Column({ name: 'maximum_speed' })
  maximum_speed: number;

  @Column({ name: 'traveled_distance' })
  traveled_distance: number;

  @Column({ name: 'average_heart_rate' })
  average_heart_rate: number;

  @Column({ name: 'sprint' })
  sprint: number;

  @Column({ name: 'time_played' })
  time_played: number;

  @Column({ name: 'average_speed_calculated' })
  average_speed_calculated: number;

  @Column({ name: 'maximum_speed_calculated' })
  maximum_speed_calculated: number;

  @Column({ name: 'traveled_distance_calculated' })
  traveled_distance_calculated: number;

  @Column({ name: 'average_heart_rate_calculated' })
  average_heart_rate_calculated: number;

  @Column({ name: 'sprint_calculated' })
  sprint_calculated: number;

  @Column({ name: 'time_played_calculated' })
  time_played_calculated: number;

  @Column()
  @IsNotEmpty()
  player: ObjectID;

  @Column({ name: 'start_date' })
  @IsNotEmpty()
  start_date: Date;

  @Column({ name: 'end_date' })
  @IsNotEmpty()
  end_date: Date;

  @Column({ name: 'week' })
  week: number;
}
