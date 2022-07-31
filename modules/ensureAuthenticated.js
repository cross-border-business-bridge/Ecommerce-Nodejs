const jwt = require('jsonwebtoken')
const config = require('../configs/jwt-config')
const TypedError = require('./ErrorHandler')
function ensureAuthenticated(req, res, next) {
  let token = ''
  // read from http header
  if (req.headers['x-access-token'] || req.headers['authorization']) {
    token = req.headers['x-access-token'] || req.headers['authorization']
  }
  //OAuth 2.0 framework 'bearer' token type
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (token) {
    // verify token, valid or not
    // Verify the token using jwt.verify method
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        let err = new TypedError('token', 401, 'invalid_field', {
          message: "Token is not valid"
        })
        // pass error to next handler
        return next(err)
      } else {
        console.log(JSON.stringify(decoded))
        //bind on request
        next()
      }
    })
  } else {
    let err = new TypedError('token', 401, 'invalid_field', {
      message: "Token is not supplied"
    })
    return next(err)
  }
};

module.exports = ensureAuthenticated