export interface Account {
  id: string;
  name: string;
  initialBalance: number;
}

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

export interface DataUser {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  uid: string;
}

export class AuthenticationError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "AuthenticationError";
    this.code = code;
  }
}
