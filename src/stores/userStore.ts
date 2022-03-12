/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import { api } from 'src/boot/axios';
import { Order } from 'src/models/order';
import { MetaData } from 'src/models/user';
import { User } from '@auth0/auth0-spa-js';

export const useUserStore = defineStore('profile', {
  persist: true,
  state: () => {
    return {
      session: useAuth0(),
    };
  },
  actions: {
    async login() {
      await this.session.loginWithRedirect();
    },
    async logoff() {
      await this.session.logout({ returnTo: window.location.href });
    },
    async resendVerification() {
      console.log('Sending Verification');
      const id: string | undefined = this.session.user.sub;
      const token = await this.session.getAccessTokenSilently();
      const data = { user_id: id };
      await api.post('jobs/verification-email', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    async refreshUser() {
      const id: string | undefined = this.session.user.sub;
      const token = await this.session.getAccessTokenSilently();

      const res = await api.get(`users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return res.data;
      }
      throw res.statusText;
    },
    async updateUser(data: Object) {
      const id: string | undefined = this.session.user.sub;
      const token = await this.session.getAccessTokenSilently();

      const res = await api.patch(`users/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return res.data;
      }
      throw res.statusText;
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    async updateUserMetadata(data: Object) {
      console.log('MetaData');
      console.log(data);
      return this.updateUser({ user_metadata: data });
    },
    async updateOrderHistory(order: Order) {
      console.log('OrderHistory');
      const currentHistory: Array<Object> = this.metadata.history
        ? [...this.metadata.history]
        : [];
      currentHistory.push(order.toObject());
      console.log(currentHistory);
      await this.updateUserMetadata({ history: currentHistory });
    },
    async updateContactPrefs(data: object) {
      await this.updateUserMetadata({ contact_methods: data });
    },
  },
  getters: {
    authenticated: (state) => state.session.isAuthenticated,
    email_verified: (state) =>
      state.session.isAuthenticated ? state.session.user.email_verified : false,
    profile: (state) => state.session.user,
    metadata: (state): MetaData =>
      state.session.isAuthenticated
        ? new MetaData(state.session.idTokenClaims['http://metadata'])
        : new MetaData(),
  },
});
