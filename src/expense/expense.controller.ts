import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Request } from 'express';
import { OwnershipGuard } from '../guards/ownership.guard';
import { Expense } from './entities';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @Req() request: any) {
    const userId = request.user.sub;
    createExpenseDto.user = userId;
    this.logger.log(
      'Request received to create an expense',
      this.constructor.name,
    );
    return this.expenseService.create({ ...createExpenseDto });
  }

  @Get()
  findAll(@Req() request: any) {
    const userId = request.user.sub;
    this.logger.log(
      'Request received to fetch all expenses',
      this.constructor.name,
    );
    return this.expenseService.findByUserId(userId);
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
  @UseGuards(OwnershipGuard(Expense))
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
