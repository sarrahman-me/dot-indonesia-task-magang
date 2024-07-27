import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Users } from 'src/users/users.model';

@Table
export class PaymentAccount extends Model<PaymentAccount> {
  @PrimaryKey
  @Unique
  @Column
  account_number: string;

  @Column
  pic: string;

  @Default(0.0)
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  balance: number;

  @ForeignKey(() => Users)
  @Column
  email: string;

  // relationship

  @BelongsTo(() => Users)
  user: Users;
}
