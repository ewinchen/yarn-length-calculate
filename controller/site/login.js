function index(req, res, next) {
  if (req.session.isAuthenticated) {
    res.redirect('/admin')
  } else {
    res.render('login', { message: '' });
  }
}

function handleLogin(req, res, next) {
  if (req.body.name === 'admin' && req.body.password === '88888') {
    req.session.isAuthenticated = true;
    res.redirect('/admin');
  } else {
    res.render('login', { message: 'Invalid user name or password...' });
  }
}


module.exports = {
  index,
  handleLogin
}