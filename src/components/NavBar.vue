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

      <!-- <q-btn
        v-if="authenticated"
        @click="getUserInfo"
        color="white"
        text-color="black"
      >
        GetInfo
      </q-btn> -->

      <q-btn
        v-if="authenticated"
        @click="showUserInfo"
        color="white"
        text-color="black"
      >
        Show User Info
      </q-btn>

      <Cart />

      <div v-if="!session.isLoading">
        <q-btn v-if="authenticated" flat dense ripple="false">
          <q-avatar>
            <q-img :src="profile.picture" />
          </q-avatar>
          <q-menu style="min-width: 10rem">
            <q-list bordered>
              <q-item-section>
                <q-item clickable to="profile">Profile</q-item>
                <q-item clickable>History</q-item>
              </q-item-section>
              <q-separator />

              <q-item-section>
                <q-item @click="logoff" clickable>Logout</q-item>
              </q-item-section>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          v-if="!authenticated"
          @click="login"
          color="white"
          text-color="white"
          flat
          dense
          ripple="false"
          >Login</q-btn
        >
      </div>
    </q-toolbar>

    <q-dialog v-model="showJson">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">User Information</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-virtual-scroll :items="[profile]">
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
  </q-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { storeToRefs, mapActions } from 'pinia';
import Cart from './Cart.vue';

export default defineComponent({
  name: 'NavBar',
  components: { Cart },
  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const store = useUserStore();
    const { profile, session, authenticated } = storeToRefs(store);

    const showJson = ref(false);

    return {
      profile,
      session,
      authenticated,
      showJson,
      showUserInfo: () => {
        showJson.value = true;
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'logoff']),
  },
});
</script>

<style lang="sass" scoped>
.logo
  max-width: 12rem
  margin-top: .5rem
  margin-bottom: .5rem
</style>
