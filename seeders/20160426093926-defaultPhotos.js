'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [{
      author: 'Laura',
      link: 'http://data.whicdn.com/images/113013599/large.jpg',
      description: 'chubby narwhal',
      createdAt: new Date(),
      updatedAt: new Date(),
      GalleryId: 1
    },
    {
      author: 'Malia',
      link: 'https://s-media-cache-ak0.pinimg.com/236x/8d/a1/02/8da1022e0e07d38b594cf6a2ef307a78.jpg',
      description: 'hedgie',
      createdAt: new Date(),
      updatedAt: new Date(),
      GalleryId: 1
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos', [{
      link: 'http://data.whicdn.com/images/113013599/large.jpg'
    },
    {
      link: 'https://s-media-cache-ak0.pinimg.com/236x/8d/a1/02/8da1022e0e07d38b594cf6a2ef307a78.jpg'
    }], {});
  }
};
