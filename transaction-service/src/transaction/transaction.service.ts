import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionRepositories } from './transaction.repositories';
import { Transaction } from './transaction.schema';
import { IpaymentAccount } from 'src/interfaces/payment_account';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  private readonly userServiceClient: ClientProxy;

  constructor(
    private readonly transactionRepositories: TransactionRepositories,
  ) {
    this.userServiceClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: 'users_service',
      },
    });
  }

  async send(payload: {
    amount: number;
    to_address: string;
    from_address: string;
    description: string;
  }): Promise<Transaction> {
    const errorField: Record<string, string> = {};

    if (!payload.amount || payload.amount < 1) {
      errorField['amount'] = 'Nominal harus lebih dari 0';
    }

    if (!payload.from_address) {
      errorField['from_address'] = 'Rekening sumber tidak valid';
    }

    if (!payload.to_address) {
      errorField['to_address'] = 'Rekening tujuan harus diisi';
    }

    if (Object.keys(errorField).length > 0) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Data tidak lengkap',
          detail: null,
          field: errorField,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (payload.from_address == payload.to_address) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Tidak boleh mengirim ke rekening yang sama',
          detail: null,
          field: null,
          help: 'Gunakan rekening tujuan yang berbeda',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const from_address = await this.get_payment_account(payload.from_address);

      if (from_address.balance < 1) {
        throw new HttpException(
          {
            code: HttpStatus.BAD_REQUEST,
            message: 'Saldo rekening tidak mencukupi',
            detail: null,
            field: null,
            help: 'Isi saldo terlebih dahulu',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const to_address = await this.get_payment_account(payload.to_address);

      this.userServiceClient.emit('update_balance', {
        amount: from_address.balance - payload.amount,
        account_number: from_address.account_number,
      });

      this.userServiceClient.emit('update_balance', {
        amount: Number(to_address.balance) + payload.amount,
        account_number: to_address.account_number,
      });

      return this.transactionRepositories.create(payload);
    } catch (err) {
      throw err;
    }
  }

  private async get_payment_account(account_number: string) {
    const response = await fetch(
      `${process.env.USER_SERVICE}/payment-account/${account_number}`,
      {
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data: { data: IpaymentAccount } = await response.json();

    if (!data.data) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: `Nomor pembayaran ${account_number} tidak valid`,
          detail: null,
          field: null,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return data.data;
  }
}
