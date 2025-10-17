import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ChargeResult } from './interfaces/charge-result.interface';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('charge')
  async createCharge(
    @Body() body: { amount: number; token: string },
  ): Promise<ChargeResult> {
    const charge = await this.paymentService.createCharge(
      body.amount,
      body.token,
    );
    return charge;
  }
}
