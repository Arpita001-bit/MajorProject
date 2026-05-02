const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");

};

module.exports.Signup = async(req,res)=>{

    try{
        let { username,email,password }=req.body;
    const newUser=new User({email,username});
    const registerdUser=await User.register(newUser,password);
    console.log(registerdUser);
    req.login((registerdUser),(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","WELCOME TO WANDERLUST");
    res.redirect("/listings");
    })
    

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
   
};
module.exports.renderLoginForm =(req,res)=>{
        res.render("users/login.ejs");
    };

module.exports.Login = (req, res) => {
  req.flash("success", "WELCOME BACK!");

  let redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;

  res.redirect(redirectUrl);
};

module.exports.Logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","you are loggedout now !");
        res.redirect("/listings");
    })
};