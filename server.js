'use strict'
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      db = require('./models'),
      Gallery = db.Gallery,
      Photo = db.Photo;

app.use(bodyParser.urlencoded({extended: true}));

// Posting a new photo
app.post('/gallery', (req,res) => {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description,
    GalleryId: req.body.GalleryId
  })
  .then((photo) => {
    res.json(photo);
  });
});

// Post to create a new gallery
app.post('/gallerys', (req,res) => {
  Gallery.create({
    title: req.body.title
  })
  .then((gallery) => {
    res.json(gallery);
  })
});

app.get('/', (req, res) => {
  Photo.findAll()
  .then((photos) => {
    res.json(photos);
  });
});

app.listen(3000, () => {
  db.sequelize.sync();
  console.log('Listening on 3000!');
});