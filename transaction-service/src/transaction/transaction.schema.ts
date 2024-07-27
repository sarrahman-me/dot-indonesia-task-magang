import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop()
  id_transaction: string;

  @Prop({ type: Number })
  amount: number;

  @Prop()
  description: string;

  @Prop()
  from_address: string;

  @Prop()
  to_address: string;

  @Prop()
  timestamp: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
