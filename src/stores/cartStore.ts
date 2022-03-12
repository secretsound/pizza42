/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Guid } from 'guid-typescript';
import { defineStore } from 'pinia';
import { Pizza, Soda } from '../models/products';

export const cartStore = defineStore('cart', {
  persist: true,
  state: () => {
    return {
      cart: Array<Pizza | Soda>(),
      cartCost: Number,
    };
  },
  actions: {
    add(item: Pizza | Soda) {
      console.log(`Adding Item: ${item.title}`);
      this.cart.push(item);
    },
    remove(guid: Guid) {
      console.log('Starting');
      for (let i = 0; i < this.cart.length; i++) {
        const y = this.cart[i].guid.toString();
        const z = guid.toString();
        if (y === z) {
          console.log(`Index: ${i}`);
          this.cart.splice(i, 1);
          break;
        }
      }
    },
    clearCart() {
      this.cart = [];
    },
    cartToJson(): Array<Object> {
      const l: Array<Object> = [];
      for (const i of this.cart) {
        l.push(i);
      }
      return l;
    },
  },
  getters: {
    currentCart: (state) => state.cart,
    currentCartCount: (state) => state.cart.length,
    currentCartTotalCost: (state) => {
      let total = 0;
      for (const i of state.cart) {
        total = total + i.price;
      }
      return total;
    },
  },
});
