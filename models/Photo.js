'use strict'

module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    author: DataTypes.STRING,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        Photo.belongsTo(models.Gallery);
      }
    }
  });

  return Photo;
};