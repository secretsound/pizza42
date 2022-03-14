/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@auth0/auth0-spa-js';
import { defineStore } from 'pinia';
import { Pizza, Soda } from '../models/products';
import { Order } from '../models/order';
import { plainToClass } from 'class-transformer';
import axios from 'axios';

export const cartStore = defineStore('cart', {
  persist: true,
  state: () => {
    return {
      cart: Array<Pizza | Soda>(),
    };
  },
  actions: {
    add(item: Pizza | Soda) {
      console.log(`Adding Item: ${item.title}`);
      this.cart.push(item);
    },
    remove(guid: string) {
      for (let i = 0; i < this.cart.length; i++) {
        const y = this.cart[i].guid;
        const z = guid;
        if (y === z) {
          this.cart.splice(i, 1);
          break;
        }
      }
    },
    clearCart() {
      this.cart = [];
    },
    async completeOrder(user: User, token: string) {
      const order = new Order(this.currentCartTotalCost, this.cartToJson());
      const { data, status } = await axios.post(
        '/api/v1/order',
        { id: user.sub, order: order.toJSON() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(status);
      return data;
    },
    cartToJson() {
      const l: Array<Object> = [];
      for (const i of this.cart) {
        let o;
        if (typeof i === 'object') {
          if (i.sku.includes('sku-p')) {
            o = plainToClass(Pizza, i);
          }
          if (i.sku.includes('sku-s')) {
            o = plainToClass(Soda, i);
          }
          console.log(i.sku);
        } else {
          o = JSON.parse(JSON.stringify(i));
        }
        l.push(o.toJSON());
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
