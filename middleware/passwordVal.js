'use strict'

function passwordVal () {
  return (req, res, next) => {

    let regInfo = req.body;
    if (!(regInfo.password === regInfo.passwordVal)) {
      return res.status(400).send('no');
    }

    return next();
  }
}

module.exports = passwordVal;