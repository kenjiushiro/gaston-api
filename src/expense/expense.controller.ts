import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    this.logger.log(
      'Request received to create an expense',
      this.constructor.name,
    );
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    this.logger.log(
      'Request received to fetch all expenses',
      this.constructor.name,
    );
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(
      `Request received to fetch expense with it ${id}`,
      this.constructor.name,
    );
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    this.logger.log(
      `Request received to patch expense with it ${id}`,
      this.constructor.name,
    );
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(
      `Request received to delete expense with it ${id}`,
      this.constructor.name,
    );
    return this.expenseService.remove(+id);
  }
}
