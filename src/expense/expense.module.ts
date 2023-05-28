import { Logger, Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense, ExpenseCurrency, ExpenseTag } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCurrency, ExpenseTag, Expense])],
  controllers: [ExpenseController],
  providers: [ExpenseService, Logger],
})
export class ExpenseModule {}
