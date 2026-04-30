const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const {saveReadirectUrl, isLoggedIn, validateReview,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");






//REVIEW
//POST ROUTE

router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.postReview)
);


 //DELET ROUTE 

 router.delete("/:reviewId",isLoggedIn,isReviewAuthor, validateReview, wrapAsync(reviewController.destroyReview))





module.exports=router;