import type { Product, User, ServerResponse, Adress, BasketCard } from './types';
import { localStore } from '../stores/local-store';

export function useApi()
{
  const baseUrl = 'http://localhost:9100/api';
  const local = localStore();

  //#region User Management
  const getConectedUser = (): User | null =>
  {
    if (!local.data.currentUser) {
      return null;
    }

    return local.data.currentUser;
  };

  const login = async (emailOrName: string, password: string): Promise<ServerResponse> =>
  {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailOrName,
        password
      })
    })

    const obj = await response.json() as ServerResponse;

    console.log('user from api', obj);

    if (obj.data) {
      local.data.currentUser = obj.data as User;
    }

    return obj;
  };

  const logout = async (): Promise<boolean> =>
  {
    const response = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
    }
    return local.logout();
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

    local.data.currentUser = newUser;

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

  const updateUserCredentials = async (name: string, email: string, password: string): Promise<boolean | { message: string }> => {
    try {
      const currentUser = local.data.currentUser;
      if (!currentUser) {
        return { message: 'Aucun utilisateur connecté' };
      }

      const users = await getUsers();
      const existingUser = users.find(u => u.id !== currentUser.id && (u.email === email || u.name === name));
      if (existingUser) {
        return { message: 'Un utilisateur avec cet email ou ce nom existe déjà' };
      }

      currentUser.name = name;
      currentUser.email = email;
      currentUser.password = password;
      local.data.currentUser = currentUser;
      return true;
    } catch {
      return { message: 'Erreur lors de la mise à jour des informations utilisateur' };
    }
  };

  const updateUserAddresses = (addresses: Adress[]): boolean | { message: string } => {
    try {
      const currentUser = local.data.currentUser;
      if (!currentUser) {
        return { message: 'Aucun utilisateur connecté' };
      }

      currentUser.adresses = addresses;
      local.data.currentUser = currentUser;
      return true;
    } catch {
      return { message: 'Erreur lors de la mise à jour des adresses' };
    }
  };

  const updateUserPaymentCards = (basketCards: BasketCard[]): boolean | { message: string } => {
    try {
      const currentUser = local.data.currentUser;
      if (!currentUser) {
        return { message: 'Aucun utilisateur connecté' };
      }

      currentUser.basketCards = basketCards;
      local.data.currentUser = currentUser;
      return true;
    } catch {
      return { message: 'Erreur lors de la mise à jour des cartes de paiement' };
    }
  };

  const getUsers = async (): Promise<User[]> =>
  {
    const users = await fetch(`${baseUrl}/getUsers`, {
      method: "GET"
    }).then((response) => response.json());
    return users as User[];
  };
  //#endregion

  //#region Product Management
  const getProducts = async (): Promise<Product[]> =>
  {
    const products = await fetch(`${baseUrl}/getProducts`, {
      method: "GET"
    }).then((response) => response.json());

    return products as Product[];
  };

  const getProductById = async (productId: number): Promise<Product | null> => {
    const response = await fetch(`${baseUrl}/getProductById`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId
      })
    });

    const product = await response.json();
    return product as Product | null;
  };
  //#endregion

  //#region Cart Management
  const getCartByUserId = (userId: number): Product[] => {
    const currentUser = local.data.currentUser;
    if (!currentUser || currentUser.id !== userId) {
      return [];
    }
    return local.data.basket || [];
  };

  const addItemToBasket = (item: Product): boolean =>
  {
    local.addItemToBasket(item);
    return true;
  };

  const deleteProductInBasket = (product: Product): boolean =>
  {
    local.deleteProductFromBasket(product);
    return true;
  };

  const buyCart = (): boolean => {
    try {
      const currentUser = local.data.currentUser;
      if (!currentUser || !local.data.basket || local.data.basket.length === 0) {
        return false;
      }
      local.data.basket = [];
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
    updateUserCredentials,
    updateUserAddresses,
    updateUserPaymentCards,

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
