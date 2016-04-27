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
app.set('views', './views');

//Get all photos from gallery
// app.get('/', (req, res) => {
//   Photo.findAll()
//   .then((photos) => {
//     let photoArr = [];
//     photos.forEach((eachPhoto) => {
//       if (eachPhoto.description !== 'chubby narwhal'){
//         photoArr.push({
//           author : eachPhoto.author,
//           link : eachPhoto.link,
//           description : eachPhoto.description,
//           id: eachPhoto.id
//         });
//       }
//     });
//     res.render('index', {staticPhoto : photos[0].link, photoArr : photoArr});
//   })
// });

// Get a new photo form
// app.get('/gallery/new', (req,res) => {
//   res.render('./newPhoto');
// });

// Get a particular photo
app.get('/gallery/:id', function (req, res) {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  // Photo.findAll()
  // .then(function (photos) {
    // let photoArr = [];
    // let photo = [];
    // photos.forEach((eachPhoto) => {
    //   if (eachPhoto.id !== 2){
    //     photoArr.push({
    //       author : eachPhoto.author,
    //       link : eachPhoto.link,
    //       description : eachPhoto.description,
    //       id: eachPhoto.id
    //     });
    //   }
    //   else {
    //     photo.push({
    //       author: eachPhoto.author,
    //       link: eachPhoto.link,
    //       description: eachPhoto.description
    //     })
    //   }
    // });
    // res.render('./photoDetail', {photo: photo, photoArr: photoArr});
    // return res.render('./photoDetail', {photo: photos});
  // })
  res.render('./photoDetail', {photo: {
          author: 'laura',
          link: 'https://s-media-cache-ak0.pinimg.com/236x/8d/a1/02/8da1022e0e07d38b594cf6a2ef307a78.jpg',
          description: 'hello'
        }});
});






// //Edit photo form
// app.get('/gallery/:id/edit', (req, res) => {
//   Photo.findAll({
//     where : {
//       id : req.params.id
//     }
//   })
//   .then((photo) => {
//     res.render('./editPhoto', {photo : photo[0]});
//   });
// });

// // Posting a new photo
// app.post('/gallery', (req,res) => {
//   Photo.create({
//     author: req.body.author,
//     link: req.body.link,
//     description: req.body.description,
//     GalleryId: req.body.GalleryId
//   })
//   .then((photo) => {
//     return res.json(photo);
//   });
// });

// // Post to create a new gallery
// app.post('/gallerys', (req,res) => {
//   Gallery.create({
//     title: req.body.title
//   })
//   .then((gallery) => {
//     return res.json(gallery);
//   });
// });

// // '/gallery/:id/edit' route redirects here to do the editing
// app.put('/gallery/:id', (req, res) => {
//   Photo.update({
//     author: req.body.author,
//     link: req.body.link,
//     description: req.body.description
//   }, {
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(() => {
//     res.redirect('/');
//   })
//   .catch((error) => {
//     res.send(error);
//   });
// });

// //Delete :)
// app.delete('/gallery/:id', (req, res) => {
//   console.log('I am deleting things!');
//   Photo.destroy({
//     where : {
//       id : req.params.id
//     }
//   })
//   .then(() => {
//     res.redirect('/');
//   })
//   .catch((error) => {
//     res.send(error);
//   });
// })

app.listen(3000, () => {
  db.sequelize.sync();
  console.log('Listening on 3000!');
});