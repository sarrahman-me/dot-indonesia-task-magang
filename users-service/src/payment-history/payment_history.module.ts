import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentHistory } from './payment_history.model';
import { PaymentHistoryRepositories } from './payment_history.repositories';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryConsumer } from './payment_history.consumer';

@Module({
  imports: [SequelizeModule.forFeature([PaymentHistory])],
  providers: [PaymentHistoryRepositories, PaymentHistoryService],
  controllers: [PaymentHistoryConsumer],
})
export class PaymentHistoryModule {}
