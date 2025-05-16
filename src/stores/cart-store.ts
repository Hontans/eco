import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Product } from '../js/types'
import productDb from '../js/products.json';

export const cartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[],
    searchTerm: '',
  }),

  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price??0), 0),
    searchItems: (state) => {
      // Utilisez directement searchTerm depuis l'état
      return productDb.filter(item =>
        item.name?.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }
  },

  actions: {
    // searchItems(search: string) {
    //   return this.items.filter(item => item.name?.toLowerCase().includes(search.toLowerCase()));
    // },

    // searchItems(search: string) {
    //   this.searchTerm = search;
    //   return this.items.filter(item => item.name?.toLowerCase().includes(search.toLowerCase()));
    // },

    addToCart(product: Product) {
      this.items.push(product);
    },

    deleteProduct(product: Product) {
      const index = this.items.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(cartStore, import.meta.hot));
}
