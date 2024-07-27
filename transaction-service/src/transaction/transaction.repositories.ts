import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v7 as uuidv7 } from 'uuid';

export class TransactionRepositories {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(payload: Partial<Transaction>): Promise<Transaction> {
    const newData: Partial<Transaction> = {
      id_transaction: uuidv7(),
      amount: payload.amount,
      from_address: payload.from_address,
      to_address: payload.to_address,
      description: payload.description,
      timestamp: new Date().toString(),
    };

    return this.transactionModel.create(newData);
  }
}
