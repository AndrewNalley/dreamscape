const jwt = require('jsonwebtoken');

//put in env file for real project
const secret = 'goodtimes';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.error('Invalid token')
        }
        return req;
    },
    signToken: function ({ email, _id }) {
        const payload = { email, _id }
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    }
}