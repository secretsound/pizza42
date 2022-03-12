/* eslint-disable @typescript-eslint/unbound-method */ /* eslint-disable
@typescript-eslint/unbound-method */
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { loginWithRedirect } = useAuth0();

    return {
      login: () => {
        void loginWithRedirect();
      },
    };
  },
};
</script>
