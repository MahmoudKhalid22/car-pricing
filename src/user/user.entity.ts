import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logId() {
    console.log('id: ', this.id);
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log('user id after update', this.id);
  }
}
