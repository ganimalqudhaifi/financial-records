export interface Record {
  id: string;
  date: Date | string;
  description: string;
  categoryId: number;
  amount: number;
  value: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  accountId: string;
}