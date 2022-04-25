const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, JSON_SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token ${err}');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};