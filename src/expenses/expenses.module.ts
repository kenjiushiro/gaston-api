import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './services/expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense, ExpenseCurrency, ExpenseTag } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseTag, ExpenseCurrency])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
