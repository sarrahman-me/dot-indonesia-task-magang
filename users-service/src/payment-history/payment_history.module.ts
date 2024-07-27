import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentHistory } from './payment_history.model';
import { PaymentHistoryRepositories } from './payment_history.repositories';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryConsumer } from './payment_history.consumer';
import { PaymentAccountModule } from 'src/payment-account/payment_account.module';
import { PaymentHistoryController } from './payment_history.controller';

@Module({
  imports: [SequelizeModule.forFeature([PaymentHistory]), PaymentAccountModule],
  providers: [PaymentHistoryRepositories, PaymentHistoryService],
  controllers: [PaymentHistoryConsumer, PaymentHistoryController],
})
export class PaymentHistoryModule {}
