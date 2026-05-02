const express= require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.get("/", (req, res) => {
  res.redirect("/listings");
});
router.head("/", (req, res) => {
  res.sendStatus(200);
});
router.get("/signup",userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.Signup));

 router.get("/login",userController.renderLoginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
   userController.Login);


router.get("/logout",userController.Logout);

module.exports=router;