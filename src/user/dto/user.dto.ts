import { User } from '../entities/user.entity';

export class UserDto {
  constructor(user: User) {
    this.email = user.email;
  }
  email: string;
}
