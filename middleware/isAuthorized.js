'use strict'
function isAuthorized () {
  return function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }
      return next();
  }; 
}
 
module.exports = isAuthorized;