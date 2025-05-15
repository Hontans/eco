import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Product } from '../js/types'

export const cartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price??0), 0),
  },

  actions: {
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
