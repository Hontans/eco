import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Product } from '../js/types'


export const dataStore = defineStore('dataStore', {
  state: () => ({
    basket: [] as Product[],
    searchTerm: '',
    selectedItem: null as Product | null,
  }),

  getters: {
    basketCount: (state) => state.basket.length,
    basketPrice: (state) => state.basket.reduce((total, item) => total + (item.price??0), 0)
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
      this.basket.push(product);
    },

    selectItem(product: Product) {
      this.selectedItem = product;
    },

    deleteProduct(product: Product) {
      const index = this.basket.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.basket.splice(index, 1);
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(dataStore, import.meta.hot));
}
