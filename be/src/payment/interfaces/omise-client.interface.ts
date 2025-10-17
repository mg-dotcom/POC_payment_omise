import { OmiseCharges } from './omise-charges.interface';

export interface OmiseClient {
  charges: OmiseCharges;
  // เพิ่ม methods อื่นๆ ได้ตามต้องการ เช่น
  // customers: OmiseCustomers;
  // transfers: OmiseTransfers;
}
