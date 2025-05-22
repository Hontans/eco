import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@vueuse/core'
import type { Product, User } from '../js/types';
import users from '../js/user.json';
import products from '../js/products.json';

const dataDefaults = {
  basket       : [] as Product[],
  searchTerm   : '',
  selectedItem : null as Product | null,
  currentUser  : null as User | null,
};

export const dataStore = defineStore('dataStore', {
  state: () => ({
    data: useLocalStorage('data', dataDefaults)
  }),

  getters: {
    basketCount: (state) => state.data.basket.length,
    basketPrice: (state) => state.data.basket.reduce((total, item) => total + (item.price??0), 0),
    isLoggedIn: (state) => state.data.currentUser !== null,
    userName: (state) => state.data.currentUser?.name || 'Invité',
  },

  actions: {
    addToCart(product: Product) {
      this.data.basket.push(product);
    },

    getProductById(id: number): Product | undefined {
      return products.find((item) => item.id === id);
    },

    selectItem(product: Product) {
      this.data.selectedItem = product;
    },

    deleteProduct(product: Product) {
      const index = this.data.basket.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.data.basket.splice(index, 1);
      }
    },

    login(emailOrName: string, password: string) {
      const user = users.find(u =>
        (u.email === emailOrName || u.name === emailOrName) &&
        u.password === password
      );

      if (user) {
        this.data.currentUser = user;
        return true;
      }

      return false;
    },

    logout() {
      this.data = dataDefaults;
    },
  },

  hydrate(state) {
    state.data = useLocalStorage('data', state.data).value;
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(dataStore, import.meta.hot));
}
