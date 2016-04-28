'use strict'
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      db = require('./models'),
      Gallery = db.Gallery,
      Photo = db.Photo,
      passport = require('passport'),
      session = require('express-session'),
      LocalStrategy = require('passport-local').Strategy,
      CONFIG = require('./config/config.json'),
      isAuthorized = require('./middleware/isAuthorized.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: CONFIG.Secret.secret
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  (username, password, done) => {
    let USERNAME = CONFIG.Secret.username;
    let PASSWORD = CONFIG.Secret.password;

    if (!(username === USERNAME && password === PASSWORD)) {
      return done(null, false)
    }
    let user = {
      name: USERNAME
    };
    return done(null, user);
  }
));
passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});
app.set('view engine', 'jade');
app.set('views', './views');

//Get all photos from gallery
app.get('/', (req, res) => {
  Photo.findAll()
  .then((photos) => {
    let photoArr = [];
    photos.forEach((eachPhoto) => {
      if (eachPhoto.description !== 'chubby narwhal'){
        photoArr.push({
          author : eachPhoto.author,
          link : eachPhoto.link,
          description : eachPhoto.description,
          id: eachPhoto.id
        });
      }
    });
    res.render('index', {staticPhoto : photos[0].link, photoArr : photoArr});
  })
});

// Get a new photo form
app.get('/gallery/new', isAuthorized(), (req,res) => {
  res.render('./newPhoto');
});

// Get a particular photo
app.get('/gallery/:id', function (req, res) {
  Photo.findAll()
  .then(function (photos) {
    
    let photoArr = photos.filter((photoItem) => {
      return photoItem.id !== Number(req.params.id)
    });

    let photo = photos.filter((photoItem) => {
      return photoItem.id === Number(req.params.id)
    });
    res.render('./photoDetail', {photo: photo[0], photoArr: photoArr});
  })
  .catch((error) => {
    throw new Error (error);
  });
});

// //Edit photo form
app.get('/gallery/:id/edit', isAuthorized(), (req, res) => {
  Photo.findAll({
    where : {
      id : req.params.id
    }
  })
  .then((photo) => {
    res.render('./editPhoto', {photo : photo[0]});
  });
});

// Get login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Post login info
app.post('/login',
  passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login'
  })
);

// // Posting a new photo
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

// // Post to create a new gallery
app.post('/gallerys', (req,res) => {
  Gallery.create({
    title: req.body.title
  })
  .then((gallery) => {
    return res.json(gallery);
  });
});

// // '/gallery/:id/edit' route redirects here to do the editing
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

// //Delete :)
app.delete('/gallery/:id', isAuthorized(), (req, res) => {
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