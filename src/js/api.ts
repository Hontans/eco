import type { Product, User } from './types';
import { dataStore } from '../stores/data-store';

export function useApi()
{
  const store = dataStore();

  //#region Basket Operations
  const addItemToBasket = (item: Product): boolean =>
  {
    store.addItemToBasket(item);
    return true;
  };
  //#endregion

  //#region Product Operations
  const getProducts = async (): Promise<Product[]> =>
  {
    const products = await fetch('/products.json').then((response) => response.json());
    return products as Product[];
  };

  const getProductById = async (id: number): Promise<Product | undefined> =>
  {
    const products = await getProducts();
    const product = products.find((item) => item.id === id);
    if (!product) {
      throw new Error('Produit non trouvé');
    }
    return product;
  };

  const deleteProduct = (product: Product): boolean =>
  {
    store.deleteProduct(product);
    return true;
  };
  //#endregion

  //#region Authentication Operations
  const logout = (): boolean =>
  {
    return store.logout();
  };

  const getConectedUser = (): User | null =>
  {
    return store.data.currentUser;
  };

  const login = async (emailOrName: string, password: string): Promise<User | null> =>
  {
    const users = await getUsers();
    const user = users.find(
      (u) => (u.email === emailOrName || u.name === emailOrName) && u.password === password,
    );
    if (user) {
      store.data.currentUser = user;
      return user;
    }
    throw new Error('Identifiants incorrects');
  };
  //#endregion

  //#region Registration Operations
  const register = async (name: string, email: string, password: string): Promise<User> => {
    const users = await getUsers();

    const existingUser = users.find(u => u.email === email || u.name === name);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email ou ce nom existe déjà');
    }

    const newUser: User = {
      name,
      email,
      password
    };

    store.data.currentUser = newUser;

    return newUser;
  };
  //#endregion

  //#region User Operations
  const getUsers = async (): Promise<User[]> =>
  {
    const users = await fetch('/users.json').then((response) => response.json());
    return users as User[];
  };
  //#endregion

  return {
    login,
    logout,
    register,
    getProducts,
    getProductById,
    addItemToBasket,
    deleteProduct,
    getConectedUser
  };
}
