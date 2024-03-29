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

export interface IDataUser {
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
