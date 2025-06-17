import Users from './mock-data/users.json';
import Products from './mock-data/products.json';

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
    getProductById
  }
}
