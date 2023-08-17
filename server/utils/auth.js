const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  context: ({ req }) => {
    // allows token to be sent via  req.query or headers
    let token = req.headers.authorization || '';

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return {}
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Check if the token has expired
      if (Date.now() >= data.exp * 1000) {
        console.log('Expired token');
        return {};
      }
      req.user = data
    } catch(error) {
      console.log('Invalid token', error);
      return {};
    }

    // send to next endpoint
    return req
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
