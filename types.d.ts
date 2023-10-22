export interface Transaction {
  id: number;
  productName: string;
  sellingPrice: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  User: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
