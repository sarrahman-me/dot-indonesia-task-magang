import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from './users.guard';
import { responseType } from 'src/interfaces/responseType';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post('send')
  async send(
    @Body()
    payload: {
      amount: number;
      to_address: string;
      from_address: string;
      description: string;
    },
  ): Promise<responseType> {
    try {
      const data = await this.transactionService.send(payload);

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
