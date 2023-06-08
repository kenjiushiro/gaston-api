import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities';
import { CreateExpenseDto } from '../dto';
import { UpdateExpenseDto } from '../dto';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const newExpense = this.expenseRepository.create({
      ...createExpenseDto,
      user: {
        id: createExpenseDto.user,
      },
    });
    return this.expenseRepository.save(newExpense);
  }

  findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  findByUserId(userId: number): Promise<Expense[]> {
    return this.expenseRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['tags'],
    });
  }

  async findOne(id: number, userId: number): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: {
        id,
      },
      relations: ['tags', 'user'],
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.user?.id != userId)
      throw new ForbiddenException(
        'You are not allowed to access this expense',
      );
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto, userId: number) {
    const expense = await this.findOne(id, userId);
    return this.expenseRepository.save({ ...expense, ...updateExpenseDto });
  }

  async remove(id: number, userId: number): Promise<Expense> {
    const expense = await this.findOne(id, userId);
    return this.expenseRepository.remove(expense);
  }
}
