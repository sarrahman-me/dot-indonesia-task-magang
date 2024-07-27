import { InjectModel } from '@nestjs/sequelize';
import { PaymentHistory } from './payment_history.model';

export class PaymentHistoryRepositories {
  constructor(
    @InjectModel(PaymentHistory)
    private readonly model: typeof PaymentHistory,
  ) {}

  async create(payload: Partial<PaymentHistory>): Promise<PaymentHistory> {
    const data = {
      id_transaction: payload.id_transaction,
      type: payload.type,
      account_number: payload.account_number,
      amount: payload.amount,
      timestamp: new Date().toString(),
    };

    return this.model.create(data);
  }
}
