import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
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

  findOne(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);
    return this.expenseRepository.save({ ...expense, ...updateExpenseDto });
  }

  async remove(id: number): Promise<Expense> {
    const expense = await this.findOne(id);
    return this.expenseRepository.remove(expense);
  }
}
