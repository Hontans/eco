import type { Product, ListeUtilisateurs, Utilisateur } from './types';
import { dataStore } from '../stores/data-store'

export function useApi() {
  const store = dataStore();

  const addItemToBasket = (item: Product): boolean => {
    store.addToCart(item);
    return true;
  }

  // Vous pouvez ajouter d'autres fonctions API ici
  const getUsers = async (): Promise<ListeUtilisateurs> => {
    const users = await fetch('/test.json')
                  .then((response) => response.json());

    return users as ListeUtilisateurs;
  }

  const getUserByEmail = async (email: string): Promise<Utilisateur> => {
    const users = await getUsers();

    const user = users.find((user) => user.email.toLocaleLowerCase() == email.toLocaleLowerCase()) as Utilisateur

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return user;
  }

  // Exposer toutes les fonctions API
  return {
    addItemToBasket,
    getUsers,
    getUserByEmail
  }
}
