import type { Product } from './types';
import { dataStore } from '../stores/data-store'

const store = dataStore();

export function addItemToBasket(item: Product) : boolean {
  store.addToCart(item);

  return true;
}
