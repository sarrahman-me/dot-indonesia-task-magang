import { Controller } from '@nestjs/common';
import { PaymentAccountService } from './payment_account.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PaymentAccountConsumer {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @EventPattern('update_balance')
  async updateBalance(payload: { amount: number; account_number: string }) {
    try {
      await this.paymentAccountService.updateBalance(
        payload.account_number,
        payload.amount,
      );
    } catch (error) {
      // send to sentry
      console.error(error);
    }
  }
}
