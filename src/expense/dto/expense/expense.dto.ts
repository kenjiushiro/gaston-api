import { UserDto } from '../../../user/dto/user.dto';
import { Expense } from '../../entities';

export class ExpenseDto {
  user: UserDto;
  amount: number;
  description: string;
  date: Date;

  constructor(expense: Expense) {
    this.user = new UserDto(expense.user);
    this.amount = expense.amount;
    this.description = expense.description;
    this.date = expense.date;
  }
}
