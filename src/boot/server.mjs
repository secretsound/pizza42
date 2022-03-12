/* eslint-disable @typescript-eslint/no-unsafe-call */
import { auth } from 'express-oauth2-jwt-bearer';
import express from 'express';

const app = express();

const checkJwt = auth({
  issuerBaseURL: 'dev-z668ye54.auth0.com',
  audience: 'undefined',
});

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!',
  });
});

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));
