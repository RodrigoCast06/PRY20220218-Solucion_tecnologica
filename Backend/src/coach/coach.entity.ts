import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('coachs')
export class Coach {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ name: 'name' })
  name: string;
}
