/* eslint-disable @typescript-eslint/no-unsafe-call */
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import { ManagementClient } from 'auth0';
import express from 'express';
import BodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const auth0_domain = 'dev-z668ye54.auth0.com';
const api_audience = 'https://pizza42/api';
const PORT_NUMBER = 8080;

// console.log(, + '/dist/spa');

const checkJwt = auth({
  issuerBaseURL: `https://${auth0_domain}/`,
  audience: api_audience,
});

const scopes = requiredScopes(['write:order']);

const client = new ManagementClient({
  domain: auth0_domain,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  audience: `https://${auth0_domain}/api/v2/`,
  scope: 'read:users update:users',
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const app = express();

app.use(express.static(__dirname + '/dist/spa'));
app.use(BodyParser.json());

app.get('/'),
  function (res, req) {
    res.sendfile('/dist/spa/index.html');
  };

app.get('/api/v1/order', checkJwt, scopes, (req, res) => {
  console.log('Successful Get');

  res.send({
    msg: 'Your Access Token was successfully validated!',
  });
});

app.post('/api/v1/order', checkJwt, scopes, async (req, res) => {
  console.log('Successful Post');

  // console.log(req);
  const { body } = req;
  const { id, order } = body;
  console.log(body);
  console.log(id);

  let userInfo;
  client
    .getUser({ id: id })
    .then((i) => {
      userInfo = JSON.parse((userInfo = JSON.stringify(i)));
    })
    .catch((err) => res.status(err.statusCode).send({ msg: err.message }));

  while (typeof userInfo === 'undefined') {
    await sleep(500);
  }

  let newHistory;
  if (userInfo) {
    const history = userInfo['user_metadata'].history;
    newHistory = history ? [...history] : [];
    newHistory.push(order);
  }

  client
    .updateUserMetadata({ id: id }, { history: newHistory })
    .then((err) => res.send({ msg: 'Order Successful' }))
    .catch((err) =>
      res.status(err.statusCode).send({ msg: 'Order Unsuccessful' })
    );
});

// Start the app
app.listen(PORT_NUMBER, () => console.log(`API listening on ${PORT_NUMBER}`));
