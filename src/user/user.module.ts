import { Module } from '@nestjs/common';
import { User } from './models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
