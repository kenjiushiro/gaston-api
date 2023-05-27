import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense, ExpenseTag } from '../../expense/entities';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Expense, (expense: Expense) => expense.user)
  @JoinTable()
  expenses: Expense[];

  @OneToMany(() => ExpenseTag, (tag: ExpenseTag) => tag.user)
  @JoinTable()
  tags: ExpenseTag[];
}
