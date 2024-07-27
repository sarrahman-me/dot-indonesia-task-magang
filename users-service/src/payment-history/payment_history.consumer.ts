import { Controller } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PaymentHistoryConsumer {
  constructor(private readonly historyService: PaymentHistoryService) {}

  @EventPattern('create_history_transaction')
  async create(payload: {
    id_transaction: string;
    type: string;
    account_number: string;
    amount: number;
  }) {
    try {
      await this.historyService.create(payload);
    } catch (error) {
      // send to sentry
      console.error(error);
    }
  }
}
