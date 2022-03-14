/* eslint-disable @typescript-eslint/ban-types */
import { User } from '@auth0/auth0-spa-js';
import { Auth0VueClient } from '@auth0/auth0-vue';
import { api } from 'src/boot/axios';
import { Order } from 'src/models/order';

export class PizzaAPI {
  ctx: Auth0VueClient;
  user: User;

  constructor(auth0Context: Auth0VueClient) {
    this.ctx = auth0Context;
    this.user = this.ctx.user;
  }

  updateUser = async (body: Object) => {
    const token = await this.ctx.getAccessTokenSilently();
    const { data, statusText, status } = await api.patch(
      `users/${this.user.value.sub}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (status === 200) {
      return data;
    }
    throw statusText;
  };

  updateUserMetadata = async (body: Object) => {
    return this.updateUser({ user_metadata: body });
  };

  updateOrderHistory = async (order: Order) => {
    const history = this.user.value['http://metadata'].history;
    const currentHistory: Array<Object> = history ? [...history] : [];
    // currentHistory.push(order.toObject());

    await this.updateUserMetadata({ history: currentHistory });
  };
}
