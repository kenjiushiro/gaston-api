import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { dataSourceOptions } from './ormconfig';
import { DataSource } from 'typeorm';

@Module({
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...dataSourceOptions }),
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
    AuthModule,
    UserModule,
    ExpenseModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
