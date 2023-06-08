import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateExpenseTagDto } from '.';

export class UpdateExpenseTagDto extends PartialType(
  OmitType(CreateExpenseTagDto, ['user']),
) {}
