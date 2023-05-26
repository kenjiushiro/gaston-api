import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense, ExpenseTag } from '../../expense/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Expense, (expense: Expense) => expense.user)
  @JoinTable()
  expenses: Expense[];

  @OneToMany(() => ExpenseTag, (tag: ExpenseTag) => tag.user)
  @JoinTable()
  tags: ExpenseTag[];
}
