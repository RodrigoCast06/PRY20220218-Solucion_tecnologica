import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('players')
export class Player {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'height' })
  height: number;

  @Column({ name: 'weight' })
  weight: number;

  @Column({ name: 'role' })
  role: string;

  @Column()
  @IsNotEmpty()
  team: ObjectID;
}
