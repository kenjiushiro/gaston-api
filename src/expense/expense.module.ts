import { Logger, Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense, ExpenseCurrency, ExpenseTag } from './entities';
import { ExpenseTagController } from './controllers/expense-tag.controller';
import { ExpenseTagService } from './services/expense-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCurrency, ExpenseTag, Expense])],
  controllers: [ExpenseController, ExpenseTagController],
  providers: [ExpenseService, ExpenseTagService, Logger],
})
export class ExpenseModule {}
