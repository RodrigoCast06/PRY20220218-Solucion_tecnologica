import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('player-statistics')
export class PlayerStatistics {
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

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'name' })
  name: string;
}
