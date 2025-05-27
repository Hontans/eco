export interface Product {
  id: number;
  name?: string | null;
  price?: number | null;
  category?: string | null;
}

export interface User {
  name: string;
  email: string;
  password: string;
  cardNumber?: string | null;
  expirationDate?: string | null;
  cryptogram?: string | null;
  country?: string | null;
  city?: string | null;
  postalCode?: string | null;
}
