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

  const getUserById = async (id: number): Promise<User | undefined> =>
  {
    const users = await getUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user;
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
      id: users.length + 1,
      name,
      email,
      password
    };

    store.data.currentUser = newUser;

    return newUser;
  };
  //#endregion

  //#region Password Reset Operations
  const forgotPassword = async (email: string): Promise<boolean> => {
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec cet email');
    }

    // Simulate sending password reset email
    return true;
  };
  //#endregion

  //#region User Operations
  const getUsers = async (): Promise<User[]> =>
  {
    const users = await fetch('/users.json').then((response) => response.json());
    return users as User[];
  };
  //#endregion

  //#region User Update Operations
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
  //#endregion

  return {
    login,
    forgotPassword,
    logout,
    register,
    getProducts,
    getProductById,
    addItemToBasket,
    deleteProduct,
    getConectedUser,
    getUserById,
    updateUser
  };
}
