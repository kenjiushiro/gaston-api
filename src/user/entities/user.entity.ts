import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense } from '../../expense/entities/expense.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @OneToMany(() => Expense, (expense: Expense) => expense.user)
  @JoinTable()
  expenses: Expense[];
}
