'use strict'

module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Gallery.hasMany(models.Photo);
      }
    }
  });

  return Gallery;
};