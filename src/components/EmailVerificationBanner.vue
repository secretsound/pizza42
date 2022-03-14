<template>
  <q-banner
    v-if="isAuthenticated && !user.email_verified"
    inline-actions
    rounded
    class="bg-green text-white text-bold text-bold q-my-md text-center"
  >
    Please verify your email address to continue your check out. We want to make
    sure it's you!
  </q-banner>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  name: 'EmailVerificationBanner',
  setup() {
    const { isAuthenticated, user } = useAuth0();

    return {
      isAuthenticated,
      user,
    };
  },
});
</script>
