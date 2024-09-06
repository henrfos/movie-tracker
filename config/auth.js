module.exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    if (req.xhr) {
      return res.status(401).json({ message: 'User not logged in' });
    }
  
    res.redirect('/login');
};