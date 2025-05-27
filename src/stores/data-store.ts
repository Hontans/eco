import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { Product, User } from '../js/types';
import products from '../../public/products.json';

const dataDefaults = {
  basket: [] as Product[],
  searchTerm: '',
  currentUser: null as User | null,
};

export const dataStore = defineStore('dataStore', {
  state: () => ({
    data: useLocalStorage('data', dataDefaults),
  }),

  getters: {
    basketCount: (state) => state.data.basket.length,
    basketPrice: (state) => state.data.basket.reduce((total, item) => total + (item.price ?? 0), 0),
    isLoggedIn: (state) => state.data.currentUser !== null,
    userName: (state) => state.data.currentUser?.name || 'Invité',
  },

  actions: {
    addItemToBasket(product: Product) {
      this.data.basket.push(product);
    },

    getProductById(id: number): Product | undefined {
      return products.find((item) => item.id === id);
    },

    deleteProduct(product: Product) {
      const index = this.data.basket.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.data.basket.splice(index, 1);
      }
    },

    logout(): boolean {
      this.data.currentUser = null;
      this.data.basket = [];
      return true;
    },
  },

  hydrate(state) {
    state.data = useLocalStorage('data', state.data).value;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(dataStore, import.meta.hot));
}
