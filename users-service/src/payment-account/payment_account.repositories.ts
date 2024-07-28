import { InjectModel } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';

export class PaymentAccountRepositories {
  constructor(
    @InjectModel(PaymentAccount)
    private readonly model: typeof PaymentAccount,
  ) {}

  async create(payload: Partial<PaymentAccount>): Promise<PaymentAccount> {
    const data = {
      account_number: payload.account_number,
      pic: payload.pic,
      balance: payload.balance,
      email: payload.email,
    };

    return this.model.create(data);
  }

  async find(account_number: string): Promise<PaymentAccount> {
    return this.model.findByPk(account_number);
  }

  async updateBalance(
    account_number: string,
    balance: number,
  ): Promise<[affectedCount: number]> {
    return this.model.update(
      { balance: balance },
      { where: { account_number } },
    );
  }

  async remove(account_number: string) {
    return this.model.destroy({
      where: {
        account_number,
      },
    });
  }
}
