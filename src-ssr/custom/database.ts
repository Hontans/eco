import Users from './mock-data/users.json';
import Products from './mock-data/products.json';
import  userBasket  from './mock-data/user-basket.json';

import fs from 'fs';

export function userDatabase()
{

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

  function updateUserDatabase() {
    fs.writeFileSync('./src-ssr/custom/mock-data/users.json', JSON.stringify(Users, null, 2));
  }

  return {
    // User management
    login,
    logout,
    register,
    forgotPassword,

    // Product management
    getProducts,
    getProductById,
    addItemToBasket,
    deleteProductInBasket
  }
}
