import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
