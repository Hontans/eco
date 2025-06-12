import type { Product, User, ErrorResponse } from './types';
import { dataStore } from '../stores/data-store';

export function useApi()
{
  const baseUrl = 'http://localhost:9100/api';
  const store = dataStore();

  //#region User Management
  const getConectedUser = (): User | null =>
  {
    return store.data.currentUser;
  };

  const login = async (emailOrName: string, password: string): Promise<User | ErrorResponse> =>
  {
    const user = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailOrName,
        password
      })
    }).then((response) => response.json());

    console.log('user from api', user);

    if (user) {
      store.data.currentUser = user;
      return user;
    }

    throw new Error('Identifiants incorrects');
  };

  const logout = (): boolean =>
  {
    return store.logout();
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    const users = await getUsers();

    const existingUser = users.find(u => u.email === email || u.name === name);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email ou ce nom existe déjà');
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password
    };

    store.data.currentUser = newUser;

    return newUser;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec cet email');
    }
    return true;
  };

  const updateUser = async (name: string, email: string, password: string, adresses: [], basketCards: []): Promise<boolean | { message: string }> => {
    try
    {
      const currentUser = store.data.currentUser;
      if (!currentUser)
      {
        return { message: 'Aucun utilisateur connecté' };
      }

      const users = await getUsers();

      const existingUser = users.find(u => u.id !== currentUser.id && (u.email === email || u.name === name));
      if (existingUser)
      {
        return { message: 'Un utilisateur avec cet email ou ce nom existe déjà' };
      }

      currentUser.name = name;
      currentUser.email = email;
      currentUser.password = password;
      currentUser.adresses = adresses;
      currentUser.basketCards = basketCards;
      store.data.currentUser = currentUser;
      return true;
    }

    catch
    {
      return { message: 'Erreur lors de la mise à jour de l\'utilisateur' };
    }
  };

  const getUsers = async (): Promise<User[]> =>
  {
    const users = await fetch('/users.json').then((response) => response.json());
    return users as User[];
  };
  //#endregion

  //#region Product Management
  const getProducts = async (): Promise<Product[]> =>
  {
    const test = await fetch(`${baseUrl}/getProducts`, {
      method: "GET"
    }).then((response) => response.json());

    console.log('products from api', test);

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
  //#endregion

  //#region Cart Management
  const getCartByUserId = (userId: number): Product[] => {
    const currentUser = store.data.currentUser;
    if (!currentUser || currentUser.id !== userId) {
      return [];
    }
    return store.data.basket || [];
  };

  const addItemToBasket = (item: Product): boolean =>
  {
    store.addItemToBasket(item);
    return true;
  };

  const deleteProductInBasket = (product: Product): boolean =>
  {
    store.deleteProduct(product);
    return true;
  };

  const buyCart = (): boolean => {
    try {
      const currentUser = store.data.currentUser;
      if (!currentUser || !store.data.basket || store.data.basket.length === 0) {
        return false;
      }
      store.data.basket = [];
      return true;
    } catch {
      return false;
    }
  };
  //#endregion

  return {
    // User Management
    getConectedUser,
    login,
    logout,
    register,
    forgotPassword,
    updateUser,

    // Product Management
    getProducts,
    getProductById,

    // Cart Management
    getCartByUserId,
    addItemToBasket,
    deleteProductInBasket,
    buyCart
  };
}
