export type VoucherType = null | {
  id: string;
  isPercentage: boolean;
  discount: number;
  description?: string;
};
