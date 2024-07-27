import { Injectable } from '@nestjs/common';
import { PaymentHistoryRepositories } from './payment_history.repositories';
import { PaymentHistory } from './payment_history.model';

@Injectable()
export class PaymentHistoryService {
  constructor(
    private readonly historyRepositories: PaymentHistoryRepositories,
  ) {}

  async create(payload: Partial<PaymentHistory>) {
    return this.historyRepositories.create(payload);
  }
}
