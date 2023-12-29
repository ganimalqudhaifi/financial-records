export interface Account {
  id?: string,
  name: string,
  initialBalance: number,
}

export interface Record {
  id?: string,
  date: string, // new Date?
  description: string,
  categoryId: number,
  amount: number,
  value: number,
  createdAt: string, // new Date?
  updatedAt: string, // new Date?
  accountId: string,
}
