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
    },
    {
      author: 'Malia',
      link: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg',
      description: 'puppy',
      createdAt: new Date(),
      updatedAt: new Date(),
      GalleryId: 1
    },
    {
      author: 'Laura',
      link: 'https://36.media.tumblr.com/d0e0bac8efd8d67942a251f7e0f04881/tumblr_mzr7xnSRfT1s1rlwwo1_500.jpg',
      description: 'baby deer',
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
    },
    {
      link: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg'
    },
    {
      link: 'https://36.media.tumblr.com/d0e0bac8efd8d67942a251f7e0f04881/tumblr_mzr7xnSRfT1s1rlwwo1_500.jpg'
    }], {});
  }
};
