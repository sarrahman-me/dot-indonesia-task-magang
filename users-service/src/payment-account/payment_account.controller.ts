import { Controller, Get, Param } from '@nestjs/common';
import { PaymentAccountService } from './payment_account.service';
import { responseType } from 'src/interfaces/responseType';

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @Get('/:account_number')
  async find(
    @Param('account_number') account_number: string,
  ): Promise<responseType> {
    try {
      const data = await this.paymentAccountService.find(account_number);

      return {
        data,
        metadata: null,
        error: null,
      };
    } catch (error) {
      if (error.response.code == 500) {
        // kirim ke sentry
      }
      return {
        data: null,
        metadata: null,
        error: error.response,
      };
    }
  }
}
