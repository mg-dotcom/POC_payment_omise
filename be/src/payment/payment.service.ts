import { Injectable } from '@nestjs/common';
import Omise from 'omise';
import { OmiseClient, ChargeResult } from './interfaces';

@Injectable()
export class PaymentService {
  private omise: OmiseClient;

  constructor() {
    this.omise = Omise({
      secretKey: process.env.OMISE_SECRET_KEY,
    }) as unknown as OmiseClient;
  }

  async createCharge(amount: number, token: string): Promise<ChargeResult> {
    const charge = await this.omise.charges.create({
      amount: amount * 100,
      currency: 'thb',
      card: token,
      description: 'Test charge from NestJS POC',
    });

    return {
      id: charge.id,
      status: charge.status,
      amount: charge.amount / 100,
      description: charge.description ?? '',
    };
  }
}
