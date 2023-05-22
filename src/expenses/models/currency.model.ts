import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseCurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
