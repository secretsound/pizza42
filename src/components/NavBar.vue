<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat to="/" ripple="false">
          <template v-slot:default>
            <img src="~assets/logo_transparent_crop.png" class="logo" />
            <img src="~assets/logo_full.jpeg" class="logo" hidden />
          </template>
        </q-btn>
      </q-toolbar-title>
      <q-space />

      <div v-if="isAuthenticated">
        <q-btn @click="showUserInfo" color="white" text-color="black">
          Show User Info
        </q-btn>
      </div>

      <Cart />

      <div v-if="isAuthenticated">
        <q-btn flat dense ripple="false">
          <q-avatar>
            <q-img :src="user.picture" />
          </q-avatar>
          <q-menu style="min-width: 10rem">
            <q-list bordered>
              <q-item-section>
                <q-btn stretch flat to="profile" class="text-bold q-pa-sm"
                  >Profile</q-btn
                >
                <q-separator />
                <q-btn stretch flat class="text-bold q-pa-sm" @click="logout"
                  >Log Off</q-btn
                >
              </q-item-section>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div v-else>
        <q-btn
          @click="loginWithRedirect"
          color="white"
          text-color="white"
          flat
          dense
          ripple="false"
          >Login</q-btn
        >
      </div>
    </q-toolbar>
  </q-header>

  <q-dialog v-model="showJson">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">User Information</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-virtual-scroll :items="[user]">
          <template v-slot="{ item }">
            <pre
              >{{ item }}
          </pre
            >
          </template>
        </q-virtual-scroll>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Cart from './Cart.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  name: 'NavBar',
  components: { Cart },
  setup() {
    const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();

    const showJson = ref(false);

    return {
      user,
      isAuthenticated,
      loginWithRedirect,
      showJson,
      showUserInfo: () => {
        showJson.value = true;
      },
      logout: async () => {
        await logout({ returnTo: window.location.href });
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.logo
  max-width: 12rem
  margin-top: .5rem
  margin-bottom: .5rem
</style>
