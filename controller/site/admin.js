function index(req, res, next) {
  /* check session and cookie */
  if (req.session.isAuthenticated) {
    res.render('admin');
  } else {
    res.redirect('/admin/login');
  }
}

module.exports = {
  index
}