'use strict'

function passwordVal () {
  return (req, res, next) => {

    let regInfo = req.body;
    if (!(regInfo.password === regInfo.passwordVal)) {
      return res.sendStatus(400);
    }

    return next();
  }
}

module.exports = passwordVal;