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
import { ExpenseTagService } from '../services/expense-tag.service';
import { CreateExpenseTagDto } from '../dto';
import { UpdateExpenseTagDto } from '../dto';
import { UserId } from '../../common/decorators/user.id.decorator';

@Controller('expense-tag')
export class ExpenseTagController {
  constructor(
    private readonly expenseTagService: ExpenseTagService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(
    @Body() createExpenseTagDto: CreateExpenseTagDto,
    @UserId() userId: number,
  ) {
    createExpenseTagDto.user = userId;
    this.logger.log(
      'Request received to create an expense tag',
      this.constructor.name,
    );
    return this.expenseTagService.create({ ...createExpenseTagDto });
  }

  @Get()
  findAll(@UserId() userId: number) {
    this.logger.log(
      'Request received to fetch all expense tags',
      this.constructor.name,
    );
    return this.expenseTagService.findByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseTagDto: UpdateExpenseTagDto,
    @UserId() userId: number,
  ) {
    this.logger.log(
      `Request received to patch expense tag with it ${id}`,
      this.constructor.name,
    );
    return this.expenseTagService.update(+id, updateExpenseTagDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: number) {
    this.logger.log(
      `Request received to delete expense tag with it ${id}`,
      this.constructor.name,
    );
    return this.expenseTagService.remove(+id, userId);
  }
}
