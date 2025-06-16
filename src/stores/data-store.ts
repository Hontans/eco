import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Product } from '../js/types';

//#region Constants
const dataDefaults = {
  products: [] as Product[],
  searchTerm: '',
  returnUrl : ''
};
//#endregion

//#region Store Definition
export const dataStore = defineStore('dataStore', {
  state: () => ({
    data: dataDefaults,
  }),

  //#region Getters
  getters: {

  },
  //#endregion

  //#region Actions
  actions: {

    getProductById(id: number): Product | undefined
    {
      return this.data.products.find((item) => item.id === id);
    },
  },
  //#endregion
});
//#endregion

//#region Hot Module Replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(dataStore, import.meta.hot));
}
//#endregion
