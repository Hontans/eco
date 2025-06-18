export interface Product {
  id: number;
  name?: string | null;
  price?: number | null;
  category?: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  basketCards?: BasketCard[] | null;
  adresses?: Adress[] | null;
}

export interface userBasket {
  userId: number;
  products: Product[];
}

export interface Adress {
  country?: string | null;
  city?: string | null;
  postalCode?: string | null;
}

export interface BasketCard {
  cardNumber?: string | null;
  expirationDate?: string | null;
  cryptogram?: string | null;
}

export interface ServerResponse {
  data  : User | Product | Product[] | User[] | null;
  error?: string;
};
