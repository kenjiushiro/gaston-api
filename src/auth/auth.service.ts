import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async signIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);

    if (!bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    return this.getToken(user);
  }

  private async getToken(user: User) {
    const payload = { sub: user.id, username: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.userService.create(createUserDto);
    return this.getToken(user);
  }
}
