import { Injectable } from '@nestjs/common';
import { PaymentHistoryRepositories } from './payment_history.repositories';
import { PaymentHistory } from './payment_history.model';
import { PaymentAccountService } from 'src/payment-account/payment_account.service';

@Injectable()
export class PaymentHistoryService {
  constructor(
    private readonly historyRepositories: PaymentHistoryRepositories,
    private readonly paymentAccountService: PaymentAccountService,
  ) {}

  async create(payload: Partial<PaymentHistory>) {
    return this.historyRepositories.create(payload);
  }

  async find_all(account_number: string): Promise<PaymentHistory[]> {
    try {
      const account = await this.paymentAccountService.find(account_number);

      const history = await this.historyRepositories.find_all_history(
        account.account_number,
      );

      return history;
    } catch (error) {
      throw error;
    }
  }
}
