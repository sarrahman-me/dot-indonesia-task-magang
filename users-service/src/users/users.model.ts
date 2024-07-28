import {
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { PaymentAccount } from '../payment-account/payment_account.model';

@Table
export class Users extends Model<Users> {
  @Column
  name: string;

  @PrimaryKey
  @Unique
  @Column
  email: string;

  @Column
  password: string;

  // relationship
  @HasOne(() => PaymentAccount, { onDelete: 'CASCADE' })
  payment_account: PaymentAccount;
}
