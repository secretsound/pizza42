/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { boot } from 'quasar/wrappers';
import { createAuth0 } from '@auth0/auth0-vue';

export const auth0_audience = 'https://dev-z668ye54.auth0.com/api/v2/';
export const auth0_domain = 'dev-z668ye54.auth0.com';

export const auth0Vue = createAuth0({
  domain: auth0_domain,
  client_id: 'UEIQVRH3goVU8JZFva3qSMgh5nJUrlPF',
  redirect_uri: 'http://localhost:8080/#/',
  audience: auth0_audience,
  scope: 'update:current_user_metadata read:current_user',
  cacheLocation: 'localstorage',
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.config.globalProperties.$auth = auth0Vue;

  app.use(auth0Vue);
});
