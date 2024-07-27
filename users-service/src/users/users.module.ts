import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersRepositories } from './users.repositories';
import { PaymentAccountModule } from 'src/payment-account/payment_account.module';

@Module({
  imports: [SequelizeModule.forFeature([Users]), PaymentAccountModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories],
})
export class UsersModule {}
