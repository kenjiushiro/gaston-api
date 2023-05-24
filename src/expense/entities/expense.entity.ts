import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpenseTag, ExpenseCurrency } from '.';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => User)
  @JoinTable()
  user: User;
}
