/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { boot } from 'quasar/wrappers';
import { createAuth0 } from '@auth0/auth0-vue';
import { api_audience, auth0_domain } from './auth0_conf';

export const auth0Vue = createAuth0({
  domain: auth0_domain,
  client_id: 'UEIQVRH3goVU8JZFva3qSMgh5nJUrlPF',
  redirect_uri: 'http://localhost:8080/#/',
  audience: api_audience,
  scope: 'write:order',
  cacheLocation: 'localstorage',
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.use(auth0Vue);
});
