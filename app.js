const express = require('express');
const path = require('path');
const favicon = require('serve-favicon')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');


const logger = require('./helper/logger');
const apiRouter = require('./router/apiRouter');
const siteRouter = require('./router/siteRouter');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// static
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  name: 'ylc',
  secret: 'yarn length calcuate',
  resave: false,
  saveUninitialized: true,
}))


app.use(morgan('short', { stream: logger.customStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* app.use(expressJwt({
  secret: 'secret',
  // credentialsRequired: true
}).unless({ path: ['/api/v1/jwt', '/jwt/express-jwt'] }))

app.post('/api/v1/jwt', function (req, res, next) {
  let name = req.body.name;
  let password = req.body.password;

  if (name === 'Edwin' && password === 'Good Luck') {
    let payload = { name: 'Edwin' };
    let token = jwt.sign(payload, 'secret');
    res.send({ type: true, token: token })
  } else {
    res.status(401);
    res.send({ type: false, message: 'passwords did not match' })
  }
}) */

app.use('/api', apiRouter);
app.use(siteRouter);

app.get('/jwt/express-jwt', function (req, res, next) {
  if (req.user) {
    logger.debug(req.user)
    return res.json('success')
  } else {
    return res.json('false')
  }
})

app.use(function (req, res, next) {
  res.status(404);
  res.json({
    type: false,
    message: '404 Not Found'
  })
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      type: false,
      message: err.message || 'invalid token...'
    });
  }
  logger.error(err.stack || err);
  if (err.status == 400) {
    res.status(400);
    res.json({
      type: false,
      message: err.message || err
    });
  } else {
    res.status(500);
    res.json({
      type: false,
      message: err.message || err
    })
  }
});

module.exports = app;
