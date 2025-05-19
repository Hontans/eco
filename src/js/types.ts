export interface Product {
  id: number;
  name?: string | null;
  price?: number | null;
}

export interface User {
  name: string;
  email: string;
  password: string;
}
