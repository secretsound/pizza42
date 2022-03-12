<template>
  <q-banner
    v-if="authenticated && !email_verified"
    inline-actions
    rounded
    class="bg-green text-white text-bold text-bold q-my-md text-center"
  >
    Please verify your email address to continue your check out. We want to make
    sure it's you!
  </q-banner>
</template>

<script>
import { useUserStore } from 'src/stores/userStore';
import { storeToRefs } from 'pinia';
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailVerificationBanner',
  setup() {
    const store = useUserStore();
    const { email_verified, authenticated } = storeToRefs(store);

    return {
      useUserStore,
      authenticated,
      email_verified,
    };
  },
  methods: {
    ...mapActions(useUserStore, ['resendVerification']),
  },
});
</script>
