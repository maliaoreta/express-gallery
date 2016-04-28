'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      first_name: "malia",
      username: "opai",
      password: "opai",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: "laura",
      username: "laura",
      password: "laura",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', [{
        username : "opai"
      }, {
        username : "laura"
      }], {});
  }
};
