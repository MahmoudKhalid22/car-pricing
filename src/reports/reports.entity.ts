import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
