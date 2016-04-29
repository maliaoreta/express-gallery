'use strict'
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      db = require('./models'),
      Gallery = db.Gallery,
      Photo = db.Photo,
      User = db.User,
      passport = require('passport'),
      session = require('express-session'),
      LocalStrategy = require('passport-local').Strategy,
      CONFIG = require('./config/config.json'),
      isAuthorized = require('./middleware/isAuthorized.js'),
      passwordVal = require('./middleware/passwordVal'),
      usernameVerification = require('./middleware/usernameVerification'),
      bcrypt = require('bcrypt');

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
    User.findOne({
      where: { username : username, password : password }
    })
    .then((User) => {
      if (User === null) {
        return done(null, false)
      }
      let USERNAME = User.username;
      let PASSWORD = User.password;
      if (!(username === USERNAME && password === PASSWORD)) {
        return done(null, false)
      }
      let user = {
        name: USERNAME
      };
      return done(null, user);
    })
    .catch((error) => {
      throw new Error (error);
    });
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
  .catch((error) => {
    console.log(error);
    return res.send(error);
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

    if (photo[0] === undefined) {
      return res.render('404');
    }

    return res.render('./photoDetail', {photo: photo[0], photoArr: photoArr});
  })
  .catch((error) => {
    return res.render('404');
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
    return res.render('./editPhoto', {photo : photo[0]});
  })
  .catch((error) => {
    return res.render('404');
  })
});

// Get login page
app.get('/login', (req, res) => {
  res.render('login');
});

//Get logout page
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Post login info
app.post('/login', (req, res) => {
  User.findOne({
    where : {
      username : req.body.username
    }
  })
  .then((user) => {
    bcrypt.compare(req.body.password, user.password, function(err, boolean) {
      if (boolean == false) {
        return res.redirect('/login');
      }
      return res.redirect('/');
    })
  })
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
  })
  .catch((error) => {
    return res.render('404');
  })
});

// // Post to create a new gallery
app.post('/gallerys', (req,res) => {
  Gallery.create({
    title: req.body.title
  })
  .then((gallery) => {
    return res.json(gallery);
  })
});

// Post to register a new User
app.post('/register', usernameVerification(User), passwordVal(), (req, res) => {
  const saltRounds = 10;
  let pw = req.body.password;
  bcrypt.hash(pw, saltRounds, function (err, hash) {
    User.create({
      first_name: req.body.first_name,
      username: req.body.username,
      password: hash
    })
    .then((user) => {
      return res.redirect('/login');
    })
    .catch((error) => {
      return res.send(error);
    });
  })
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
    return res.render('404');
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
    return res.render('404');
  })
});

app.listen(3000, () => {
  db.sequelize.sync();
  console.log('Listening on 3000!');
});