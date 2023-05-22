import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpenseTag, ExpenseCurrency } from '.';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => ExpenseCurrency)
  @JoinTable()
  currency: ExpenseCurrency;

  @Column('text')
  description: string;

  @Column('date')
  date: Date;

  @ManyToMany(() => ExpenseTag)
  @JoinTable()
  tags: ExpenseTag[];
}
