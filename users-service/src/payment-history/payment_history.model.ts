import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PaymentAccount } from 'src/payment-account/payment_account.model';

enum RoleType {
  RECEIVER = 'receiver',
  SENDER = 'sender',
}

@Table
export class PaymentHistory extends Model<PaymentHistory> {
  @Column
  id_transaction: string;

  @Column({
    type: DataType.ENUM(...Object.values(RoleType)),
  })
  type: string;

  @ForeignKey(() => PaymentAccount)
  @Column
  account_number: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  amount: number;

  @Column
  timestamp: string;

  // relationship

  @BelongsTo(() => PaymentAccount)
  payment_account: PaymentAccount;
}
