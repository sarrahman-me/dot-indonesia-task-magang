import { Controller, Get, Param } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { responseType } from 'src/interfaces/responseType';

@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly historyService: PaymentHistoryService) {}

  @Get('/account/:account_number')
  async find_all(
    @Param('account_number') account_number: string,
  ): Promise<responseType> {
    try {
      const data = await this.historyService.find_all(account_number);

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
