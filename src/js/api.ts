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

    if (obj.data) {
      console.log('api.login :: login success', obj);
      local.data.currentUser = obj.data as User;
      return obj;
    }

    console.log('api.login :: Login failed:', obj.error);
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

    const obj = await response.json() as ServerResponse;

    if (obj.data) {
      console.log('api.logout :: logout success');
      local.logout();
      return true;
    }
    console.log('api.logout :: logout failed:', obj.error);
    return local.logout();
  };

  const register = async (name: string, email: string, password: string): Promise<ServerResponse> =>
  {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const obj = await response.json() as ServerResponse;
    console.log('api.register :: after fetch', obj);

    if (obj.error) {
      console.log('api.register :: Registration failed:', obj.error);
      return obj;
    }

    await login(email, password);
    return obj;
  };

  const forgotPassword = async (email: string): Promise<ServerResponse> =>
  {
    const response = await fetch(`${baseUrl}/forgotPassword`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });

    const obj = await response.json() as ServerResponse;
    console.log('api.forgotPassword :: Forgot password success', obj);

    if (obj.error) {
      console.log('api.forgotPassword :: Forgot password failed:', obj.error);
      return obj;
    }
    return obj;
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

    return products.data as Product[];
  };

  const getProductById = async (productId: number): Promise<Product | null> =>
  {
    const response = await fetch(`${baseUrl}/getProductById`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId
      })
    });

    const obj = await response.json() as ServerResponse;

    if (obj.data) {
      console.log('api.getProductById :: getProductById failed:', obj.error);
      return obj.data as Product
    }
    return null;
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
