if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express= require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError =require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const app= express();
const dbUrl = process.env.ATLASDB_URL;
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");
const userRouter = require("./routes/user.js");
const {isLoggedIn} = require("./middleware.js");

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/public')));


const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
        
    },
    touchAfter:24*3600,
});
const sessionOptions= {
    store,
 secret: process.env.SECRET,
 resave: false,
 saveUninitialized : true,
 cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
 }
};


main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}




store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    
    next();
});



const validateListings=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
  if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }
};

const validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
  if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }
};
 


app.use((req,res,next)=>{
  console.log("ROUTE HIT:", req.method, req.path);
  next();
});
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);
app.all(/(.*)/,(req,res,next)=>{
    next(new ExpressError(404,"page not found !"));
 });
//  app.use((err,req,res,next)=>{
//     let {statusCode=500,message="something went wrong!"}=err;
//     // res.status(statusCode).send(message);
//     res.render("error.ejs",{message});
// });

app.use((err, req, res, next) => {
  console.log("🔥🔥🔥 REAL ERROR BELOW 🔥🔥🔥");
  console.log(err);

  res.send(`
    <h1>REAL ERROR</h1>
    <pre>${err.stack}</pre>
  `);
});
    app.listen(8080,()=>{
    console.log("server is listening to port");
});




