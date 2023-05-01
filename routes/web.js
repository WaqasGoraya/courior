const express =  require("express");
const passport =  require("passport");
const HomeController =  require("../controllers/HomeController.js");
const authController =  require("../controllers/authController.js");
const ensureAuthenticated =  require("../middleware/googleAuthMiddleware.js");
const guest = require("../middleware/Guest.js");

const router = express.Router();

router.get('/',HomeController.index);
router.get('/about',HomeController.about);
router.get('/services',HomeController.services);
router.get('/contact',HomeController.contact);

//tacking
router.post('/track', HomeController.track);



router.get("/register",guest, authController.register);
router.post("/register", authController.store);
router.get("/confirm_email/:id", authController.confrim_email);
router.get("/forgot_password", authController.forgot_password);
router.post("/forgot_password", authController.forgot_password_store);
router.get("/reset_password/:id", authController.reset_password);
router.post("/reset_password/:id", authController.reset_password_store);
router.get("/login",guest,authController.login);
router.post("/login", authController.auth);
router.post("/logout", authController.logout);




// Initiates the Google OAuth2 authentication process
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Completes the Google OAuth2 authentication process
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {

    // Successful authentication, redirect to the home page
    res.redirect('/');
  });


  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // This route requires authentication
    res.render('dashboard');
  });
module.exports = router ;
