export interface Transaction {
  id: number;
  productName: string;
  sellingPrice: number;
  purchasePrice: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  User?: User;
}

export interface User {
  id: number;
  name: string;
  role: string;
  token: string;
}
