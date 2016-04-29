'use strict';

function validateUsername(User){
  return (req, res, next) => {
    let regInfo = req.body;
    User.findAll({
      where:  {
        username : regInfo.username
      }
    })
    .then((user) => {
      if (user[0] !== undefined){
        return res.status(400).json({ failure : "username" });
      }
      return next();
    })
  }
}
module.exports = validateUsername;