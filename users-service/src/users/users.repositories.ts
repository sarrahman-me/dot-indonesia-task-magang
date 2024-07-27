import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { PaymentAccount } from 'src/payment-account/payment_account.model';

export class UsersRepositories {
  constructor(@InjectModel(Users) private readonly model: typeof Users) {}

  async add(payload: Partial<Users>): Promise<Users> {
    const dataPayload: Partial<Users> = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };

    return this.model.create(dataPayload);
  }

  async find(email: string): Promise<Users> {
    return this.model.findOne({
      where: {
        email,
      },
      include: {
        model: PaymentAccount,
      },
    });
  }
}
