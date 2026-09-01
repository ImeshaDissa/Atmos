//auth) token verify
require ('dotenv').config();
const {auth} = require('express-oauth2-jwt-bearer');

const checkAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

module.exports = checkAuth;
