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
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto } from '../dto';
import { UpdateExpenseDto } from '../dto';
import { UserId } from '../../common/decorators/user.id.decorator';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @UserId() userId: number) {
    createExpenseDto.user = userId;
    this.logger.log(
      'Request received to create an expense',
      this.constructor.name,
    );
    return this.expenseService.create({ ...createExpenseDto });
  }

  @Get()
  findAll(@UserId() userId: number) {
    this.logger.log(
      'Request received to fetch all expenses',
      this.constructor.name,
    );
    return this.expenseService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: number) {
    this.logger.log(
      `Request received to fetch expense with it ${id}`,
      this.constructor.name,
    );
    return this.expenseService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @UserId() userId: number,
  ) {
    this.logger.log(
      `Request received to patch expense with it ${id}`,
      this.constructor.name,
    );
    return this.expenseService.update(+id, updateExpenseDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: number) {
    this.logger.log(
      `Request received to delete expense with it ${id}`,
      this.constructor.name,
    );
    return this.expenseService.remove(+id, userId);
  }
}
