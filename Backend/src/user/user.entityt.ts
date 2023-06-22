import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;
}
