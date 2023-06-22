import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('teams')
export class Team {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ name: 'name' })
  name: string;

  @Column()
  @IsNotEmpty()
  coach: ObjectID;
}
