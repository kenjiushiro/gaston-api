import { Type } from '@nestjs/class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  user: number;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
