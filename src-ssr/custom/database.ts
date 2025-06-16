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
    return true;
  }

  function register(name: string, email: string, password: string)
  {
    if (!name || !email || !password) {
      throw new Error('Tous les champs sont requis');
    }

    const existingUser = Users.find(u => u.email === email || u.name === name);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email ou ce nom existe déjà');
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

    return newUser;
  }

  function forgotPassword(email: string)
  {
    const user = Users.find(u => u.email === email);
    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec cet email');
    }
    return true;
  }

  function getUserById(userId: number)
  {
    const user = Users.find(user => user.id === userId);
    return user;
  }

  function getProducts()
  {
    return Products;
  }

  function getProductById(productId: number)
  {
    const product = Products.find(product => product.id === productId);
    return product;
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
    getUserById,
    getProducts,
    getProductById
  }
}
