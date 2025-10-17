export interface OmiseCharge {
  id: string;
  status: string;
  amount: number;
  description?: string | null;
  currency?: string;
  created?: string;
  [key: string]: any; // สำหรับ fields อื่นๆ ที่ Omise return มา
}
