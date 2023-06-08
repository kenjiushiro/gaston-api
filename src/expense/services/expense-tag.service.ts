import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseTag } from '../entities';
import { CreateExpenseTagDto } from '../dto/expense-tag/create-expense-tag.dto';
import { UpdateExpenseTagDto } from '../dto/expense-tag/update-expense-tag.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseTagService {
  constructor(
    @InjectRepository(ExpenseTag)
    private expenseTagRepository: Repository<ExpenseTag>,
  ) {}

  create(createExpenseDto: CreateExpenseTagDto): Promise<ExpenseTag> {
    const newExpenseTag = this.expenseTagRepository.create({
      ...createExpenseDto,
      user: {
        id: createExpenseDto.user,
      },
    });
    return this.expenseTagRepository.save(newExpenseTag);
  }

  findByUserId(userId: number): Promise<ExpenseTag[]> {
    return this.expenseTagRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findOne(id: number, userId: number): Promise<ExpenseTag> {
    const expenseTag = await this.expenseTagRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!expenseTag) {
      throw new NotFoundException('Expense not found');
    }

    if (expenseTag.user?.id != userId)
      throw new ForbiddenException(
        'You are not allowed to access this expense',
      );
    return expenseTag;
  }

  async update(
    id: number,
    updateExpenseTagDto: UpdateExpenseTagDto,
    userId: number,
  ) {
    const expenseTag = await this.findOne(id, userId);
    return this.expenseTagRepository.save({
      ...expenseTag,
      ...updateExpenseTagDto,
    });
  }

  async remove(id: number, userId: number): Promise<ExpenseTag> {
    const expenseTag = await this.findOne(id, userId);
    return this.expenseTagRepository.remove(expenseTag);
  }
}
