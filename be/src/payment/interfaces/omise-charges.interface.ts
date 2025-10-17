import { OmiseCharge } from './omise-charge.interface';

export interface OmiseCharges {
  create: (params: {
    amount: number;
    currency: string;
    card: string;
    description?: string;
  }) => Promise<OmiseCharge>;

  retrieve: (chargeId: string) => Promise<OmiseCharge>;

  refund: (chargeId: string, params?: { amount?: number }) => Promise<any>;
}
