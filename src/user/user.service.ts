import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findByEmail(createUserDto.email)) {
      throw new ConflictException(
        `A user with the email ${createUserDto.email} already exists`,
      );
    }
    const user = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
