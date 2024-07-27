import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';
import { PaymentAccountRepositories } from './payment_account.repositories';
import { PaymentAccountService } from './payment_account.service';
import { PaymentAccountController } from './payment_account.controller';
import { PaymentAccountConsumer } from './payment_account.consumer';

@Module({
  imports: [SequelizeModule.forFeature([PaymentAccount])],
  providers: [PaymentAccountRepositories, PaymentAccountService],
  controllers: [PaymentAccountController, PaymentAccountConsumer],
  exports: [PaymentAccountService],
})
export class PaymentAccountModule {}
