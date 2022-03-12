<template>
  <q-layout view="hHh lpR fFf">
    <NavBar />

    <q-page-container class="main-body">
      <EmailVerificationBanner />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from 'src/components/NavBar.vue';
import EmailVerificationBanner from 'src/components/EmailVerificationBanner.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { NavBar, EmailVerificationBanner },

  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped>
.main-body
  max-width: 90%
  margin-left: auto
  margin-right: auto
</style>
