import Users from './mock-data/users.json';
import Products from './mock-data/products.json';

export function userDatabase()
{

  function login (emailOrName: string, password: string)
  {
    const user = Users.find(user => (user.email === emailOrName || user.name === emailOrName) && user.password === password);
    return user || null;
  }

  function logout()
  {
    return true;
  }

  function register(name: string, email: string, password: string)
  {
    const existingUser = Users.find(u => u.email === email || u.name === name);
    if (existingUser) {
      return {
        error: 'Un utilisateur avec cet email ou ce nom existe déjà'
      }
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
    return newUser;
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

  return {
    // User management
    login,
    logout,
    register,

    // Product management
    getUserById,
    getProducts
  }
}
