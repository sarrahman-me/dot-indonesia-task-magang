import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentAccountRepositories } from './payment_account.repositories';
import { PaymentAccount } from './payment_account.model';
import { Generator } from 'src/helpers/generator';

@Injectable()
export class PaymentAccountService {
  constructor(
    private readonly paymentAccountRepositories: PaymentAccountRepositories,
  ) {}

  private generator = new Generator();

  async create(payload: Partial<PaymentAccount>): Promise<PaymentAccount> {
    if (!payload.pic) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Nama pemegang akun pembayaran (pic harus ada)',
          detail: null,
          field: null,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!payload.email) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Email pemegang akun pembayaran harus ada',
          detail: null,
          field: null,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const account_number = this.generator.accountNumber();

    const newPaymentAccount: Partial<PaymentAccount> = {
      account_number,
      pic: payload.pic.toUpperCase(),
      balance: 0.0,
      email: payload.email,
    };

    return this.paymentAccountRepositories.create(newPaymentAccount);
  }

  async find(account_number: string): Promise<PaymentAccount> {
    const data = await this.paymentAccountRepositories.find(account_number);

    if (!data) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Akun pembayaran tidak ditemukan',
          detail: null,
          field: {
            account_number: 'gunakan Akun pembayaran yang berbeda',
          },
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  async updateBalance(account_number: string, amount: number) {
    const account = await this.find(account_number);

    await this.paymentAccountRepositories.updateBalance(
      account.account_number,
      amount,
    );
  }
}
