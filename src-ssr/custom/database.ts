//#region Imports
import Users from './mock-data/users.json';
import Products from './mock-data/products.json';
import userBasket from './mock-data/user-basket.json';
import {type Adress, type BasketCard} from '../../src/js/types'

import fs from 'fs';
//#endregion

function test() {
  Users.forEach(user => {
    user.adresses = adresses.filter(adress => adress.userId === user.id);
    user.basketCards =  userBasket.filter(card => card.userId === user.id);
  });
}


export function userDatabase()
{

  //#region User Authentication
  function login (emailOrName: string, password: string)
  {
    const user = Users.find(user => (user.email === emailOrName || user.name === emailOrName) && user.password === password);
    return {
      data : user || null,
      error: user ? null : 'Identifiants invalides'
    };
  }

  function logout()
  {
    return {
      data: true,
      error: null
    };
  }

  function register(name: string, email: string, password: string)
  {
    try {
      if (!name || !email || !password) {
        return {
          data: null,
          error: 'Tous les champs sont requis'
        };
      }

      const existingUser = Users.find(u => u.email === email || u.name === name);
      if (existingUser) {
        return {
          data: null,
          error: 'Un utilisateur avec cet email ou ce nom existe déjà'
        };
      }

      const newUser = {
        id: Users.length + 1,
        name,
        email,
        password,
        adresses: [],
        basketCards: []
      };

      Users.push(newUser);
      console.log('Users', Users);

      updateUserDatabase();

      return {
        data: newUser,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      };
    }
  }

  function forgotPassword(email: string)
  {
    const user = Users.find(u => u.email === email);
    if (!user) {
      return {
        data: null,
        error: 'Aucun utilisateur trouvé avec cet email'
      };
    }
    return {
      data: true,
      error: null
    };
  }
  //#endregion
  //#region User Update Functions
  function updateUserCredentials(userId: number, name?: string, email?: string, password?: string) {
    try {
      const userIndex = Users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return {
          data: null,
          error: 'Utilisateur non trouvé'
        };
      }

      // Vérifier si l'email ou le nom existe déjà pour un autre utilisateur
      if (email || name) {
        const existingUser = Users.find(u => u.id !== userId && (u.email === email || u.name === name));
        if (existingUser) {
          return {
            data: null,
            error: 'Un utilisateur avec cet email ou ce nom existe déjà'
          };
        }
      }

      const user = Users[userIndex];
      if (!user) {
        return {
          data: null,
          error: 'Utilisateur non trouvé'
        };
      }

      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (password !== undefined) user.password = password;

      updateUserDatabase();

      return {
        data: user,
        error: null
      };
    } catch {
      return {
        data: null,
        error: 'Erreur lors de la mise à jour des informations utilisateur'
      };
    }
  }

  function updateUserAddresses(userId: number, addresses: Adress[]) {
    try {
      const userIndex = Users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return {
          data: null,
          error: 'Utilisateur non trouvé'
        };
      }

      const user = Users[userIndex];
      if (!user) {
        return {
          data: null,
          error: 'Utilisateur non trouvé'
        };
      }

      // Filter out addresses with null values and ensure proper structure
      const validAddresses = addresses.filter(addr =>
        addr.country !== null && addr.city !== null && addr.postalCode !== null
      ).map(addr => ({
        country: addr.country!,
        city: addr.city!,
        postalCode: addr.postalCode!
      }));

      user.adresses = validAddresses;
      updateUserDatabase();

      return {
        data: user,
        error: null
      };
    } catch {
      return {
        data: null,
        error: 'Erreur lors de la mise à jour des adresses'
      };
    }
  }

  function updateUserPaymentCards(userId: number, basketCards: BasketCard[]) {
    try {
      const userIndex = Users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return {
          data: null,
          error: 'Utilisateur non trouvé'
        };
      }

      const user = Users[userIndex];
      if (!user) {
        return {
          data: null,
          error: 'Utilisateur non trouvé'
        };
      }

      // Filter out cards with null values and ensure proper structure
      const validCards = basketCards.filter(card =>
        card.cardNumber !== null && card.expirationDate !== null && card.cryptogram !== null
      ).map(card => ({
        cardNumber: card.cardNumber!,
        expirationDate: card.expirationDate!,
        cryptogram: card.cryptogram!
      }));

      user.basketCards = validCards;
      updateUserDatabase();

      return {
        data: user,
        error: null
      };
    } catch{
      return {
        data: null,
        error: 'Erreur lors de la mise à jour des cartes de paiement'
      };
    }
  }
  //#endregion
  //#region User Management

  //#endregion

  //#region Product Management
  function getProducts()
  {
    return {
      data: Products,
      error: null
    };
  }

  function getProductById(productId: number)
  {
    const product = Products.find(product => product.id === productId);
    return {
      data: product || null,
      error: product ? null : 'Produit non trouvé'
    };
  }
  //#endregion

  //#region Basket Management
  function addItemToBasket(userId: number, productId: number) {
    try {
      const product = Products.find(p => p.id === productId);
      if (!product) {
        return {
          data: null,
          error: 'Produit non trouvé'
        };
      }

      let userBasketData = userBasket.find(ub => ub.userId === userId);
      if (!userBasketData) {
        userBasketData = {
          userId: userId,
          basket: []
        };
        userBasket.push(userBasketData);
      }

      const existingItem = userBasketData.basket.find(item => item.id === productId);
      if (existingItem) {
        return {
          data: null,
          error: 'Produit déjà dans le panier'
        };
      }

      userBasketData.basket.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category
      });

      fs.writeFileSync('./src-ssr/custom/mock-data/user-basket.json', JSON.stringify(userBasket, null, 2));

      return {
        data: userBasketData.basket,
        error: null
      };
    } catch {
      return {
        data: null,
        error: 'Erreur lors de l\'ajout au panier'
      };
    }
  }

  function deleteProductInBasket(userId: number, productId: number) {
    try {
      const userBasketData = userBasket.find(ub => ub.userId === userId);
      if (!userBasketData) {
        return {
          data: null,
          error: 'Panier utilisateur non trouvé'
        };
      }

      const itemIndex = userBasketData.basket.findIndex(item => item.id === productId);
      if (itemIndex === -1) {
        return {
          data: null,
          error: 'Produit non trouvé dans le panier'
        };
      }

      userBasketData.basket.splice(itemIndex, 1);

      fs.writeFileSync('./src-ssr/custom/mock-data/user-basket.json', JSON.stringify(userBasket, null, 2));

      return {
        data: userBasketData.basket,
        error: null
      };
    } catch {
      return {
        data: null,
        error: 'Erreur lors de la suppression du produit du panier'
      };
    }
  }

  function getBasketByUserId(userId: number) {
    try {
      const userBasketData = userBasket.find(ub => ub.userId === userId);
      if (!userBasketData) {
        return {
          data: [],
          error: null
        };
      }

      return {
        data: userBasketData.basket,
        error: null
      };
    } catch {
      return {
        data: null,
        error: 'Erreur lors de la récupération du panier'
      };
    }
  }
  //#endregion

  //#region Database Utils
  function updateUserDatabase() {
    fs.writeFileSync('./src-ssr/custom/mock-data/users.json', JSON.stringify(Users, null, 2));
  }
  //#endregion

  return {
    login,
    logout,
    register,
    forgotPassword,
    updateUserCredentials,
    updateUserAddresses,
    updateUserPaymentCards,

    getProducts,
    getProductById,
    addItemToBasket,
    deleteProductInBasket,
    getBasketByUserId,
  }
}
