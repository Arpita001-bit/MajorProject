// // if(process.env.NODE_ENV != "production"){
// // require('dotenv').config();
// // }




// // const express= require("express");
// // const router = express.Router();
// // const Listing = require("../models/listing.js");
// // const { model } = require("mongoose");
// // const wrapAsync = require("../utils/wrapAsync.js");
// // const ExpressError =require("../utils/ExpressError.js");
// // const { isLoggedIn, isOwner,validateListing} = require("../middleware.js");
// // const multer  = require('multer');
// // const {storage}= require("../cloudConfig.js");
// // const upload = multer({storage});
// // const listingController = require("../controllers/listing.js");









// // // router.route ("/")
// // // .get(wrapAsync(listingController.index))
// // // router.route("/")
// // // .get(wrapAsync(listingController.index))
// // // router.route("/")
// // // .get(wrapAsync(listingController.index))
// // // .post(
// // //   isLoggedIn,
// // //     upload.single("image"),
// // //   (req, res, next) => {
// // //     console.log("REACHED HERE - BODY:", JSON.stringify(req.body));
// // //     next();
// // //   },
// // //   validateListing,
// // //   wrapAsync(listingController.createListing)
// // // );
// // // .post(
// // //   isLoggedIn,
// // //     validateListing,
// // //   upload.single("image"),

// // //   (req, res, next) => {
// // //     console.log(req.user);
// // //     console.log("BODY:", req.body);   // ← add this
// // //     console.log("FILE:", req.file);   // ← add this
// // //     next();
// // //   },
// // //   wrapAsync(listingController.createListing)
// // // )

// // router.get("/", wrapAsync(listingController.index));

// // router.post(
// //   "/",
// //   isLoggedIn,
// //   upload.single("image"),
// //   (req, res, next) => {
// //     console.log("MULTER DONE - BODY:", JSON.stringify(req.body));
// //     console.log("MULTER DONE - FILE:", req.file);
// //     next();
// //   },
// //   validateListing,
// //   wrapAsync(listingController.createListing)
// // );


// // //NEW ROUTE
// //  router.get("/new",isLoggedIn,listingController.renderNewForm);

// // router.route("/:id")
// // .get(wrapAsync(listingController.showListing))
// // .put(isLoggedIn,
// //     isOwner,
// //       upload.single("image"),
// //     wrapAsync(listingController.updateListing))
// // .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


// // //EDIT ROUTE
// //  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

// // module.exports = router;

// router.get("/", wrapAsync(listingController.index));

// router.post(
//   "/",
//   isLoggedIn,
//   upload.single("image"),
//   (req, res, next) => {
//     console.log("MULTER DONE - BODY:", JSON.stringify(req.body));
//     console.log("MULTER DONE - FILE:", req.file);
//     next();
//   },
//   validateListing,
//   wrapAsync(listingController.createListing)
// );

// router.get("/new", isLoggedIn, listingController.renderNewForm);

// router.get("/:id", wrapAsync(listingController.showListing));

// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   upload.single("image"),
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );

// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.deleteListing)
// );

// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));
// module.exports = router;


const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingController = require("../controllers/listing.js");

router.get("/", wrapAsync(listingController.index));

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  (req, res, next) => {
    console.log("MULTER DONE - BODY:", JSON.stringify(req.body));
    console.log("MULTER DONE - FILE:", req.file);
    next();
  },
  validateListing,
  wrapAsync(listingController.createListing)
);

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/:id", wrapAsync(listingController.showListing));

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;