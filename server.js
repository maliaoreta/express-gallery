'use strict'
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      db = require('./models'),
      Gallery = db.Gallery,
      Photo = db.Photo;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');

//Get all photos from gallery
app.get('/', (req, res) => {
  Photo.findAll()
  .then((photos) => {
    res.json(photos);
  });
});

// Get a new photo form
app.get('/gallery/new', (req,res) => {
  res.render('./newPhoto');
});


// Get a particular photo
app.get('/gallery/:id', (req, res) => {
  Photo.findAll({
    where : {
      id : req.params.id
    }
  })
  .then((photo) => {
    console.log('hello');
    return res.json(photo);
  });
});

//Edit photo form
app.get('/gallery/:id/edit', (req, res) => {
  Photo.findAll({
    where : {
      id : req.params.id
    }
  })
  .then((photo) => {
    res.render('./editPhoto', {photo : photo[0]});
  });
});

// Posting a new photo
app.post('/gallery', (req,res) => {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description,
    GalleryId: req.body.GalleryId
  })
  .then((photo) => {
    return res.json(photo);
  });
});

// Post to create a new gallery
app.post('/gallerys', (req,res) => {
  Gallery.create({
    title: req.body.title
  })
  .then((gallery) => {
    return res.json(gallery);
  });
});

// '/gallery/:id/edit' route redirects here to do the editing
app.put('/gallery/:id', (req, res) => {
  Photo.update({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch((error) => {
    res.send(error);
  });
});

//Delete :)
app.delete('/gallery/:id', (req, res) => {
  console.log('I am deleting things!');
  Photo.destroy({
    where : {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch((error) => {
    res.send(error);
  });
})

app.listen(3000, () => {
  db.sequelize.sync();
  console.log('Listening on 3000!');
});