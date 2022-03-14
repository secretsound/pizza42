<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat to="/" ripple="false">
          <template v-slot:default>
            <img src="~assets/logo_transparent_crop.png" class="logo" />
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
                <q-item clickable to="profile">Profile</q-item>
                <q-item clickable>History</q-item>
              </q-item-section>
              <q-separator />

              <q-item-section>
                <q-item @click="logout" clickable>Logout</q-item>
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
      logout,
      loginWithRedirect,
      showJson,
      showUserInfo: () => {
        showJson.value = true;
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
