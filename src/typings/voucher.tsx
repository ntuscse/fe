export type VoucherType = {
  id: number | string;
  isPercentage: boolean;
  discount: number;
  description?: string;
} | null;
