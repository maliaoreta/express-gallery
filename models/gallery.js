'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define('Gallery', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Gallery.hasMany(models.Photo);
      }
    }
  });
  return Gallery;
};