import { IsNotEmpty } from 'class-validator';

export class CreateExpenseTagDto {
  user: number;
  @IsNotEmpty()
  name: string;
}
