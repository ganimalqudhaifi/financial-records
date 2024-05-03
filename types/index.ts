export interface Account {
  id: string,
  name: string,
  initialBalance: number,
}

export type AddAccountArgs = Pick<Account, 'name' | 'initialBalance'>

export interface Record {
  id: string,
  date: string,
  description: string,
  categoryId: number,
  amount: number,
  value: number,
  createdAt: string,
  updatedAt: string,
  accountId: string,
}

export type AddRecordArgs = Omit<Record, 'id'>

export interface DataUser {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
}

export class AuthenticationError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'AuthenticationError';
    this.code = code;
  }
}
