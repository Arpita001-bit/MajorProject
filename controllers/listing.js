const Listing = require("../models/listing.js");






module.exports.index = async(req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
    
 };

 module.exports.renderNewForm = (req,res)=>{
   res.render("listings/new.ejs");
 };

 module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("error","listing not found!");
      return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});

 };

//  module.exports.createListing = async (req,res,next)=>{
//     const newListing = new Listing(req.body.listing);
//      newListing.owner = req.user._id; 
//      if (req.file) {
//   let url = req.file.path;
//   let filename = req.file.filename;
//   newListing.image = { url, filename };
// }
//     //  newListing.image ={url,filename};
//      await newListing.save();
//      req.flash("success","new listing created...");
//      res.redirect("/listings");
 
    
//   };
// module.exports.createListing = async (req, res, next) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     console.log("USER:", req.user);

//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;

//     if (req.file) {
//       let url = req.file.path;
//       let filename = req.file.filename;
//       newListing.image = { url, filename };
//     }

//     await newListing.save();

//     req.flash("success", "new listing created...");
//     res.redirect("/listings");

//   } catch (err) {
//   console.log("FULL ERROR:", err);
//   res.send(err.message);
// }
// };


module.exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);

    // safety check for user
    if (req.user) {
      newListing.owner = req.user._id;
    }

    // safety check for file
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await newListing.save();

    req.flash("success", "New listing created!");
    res.redirect("/listings");

  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating listing");
    res.redirect("/listings");
  }
};
    
 

 module.exports.editListing = async(req,res)=>{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    
    if(!listing){
      req.flash("error","listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/edit.ejs",{listing});
 };

 module.exports.updateListing = async(req,res)=>{
      
      let {id}=req.params;
      let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

      // let url = req.file.path;
      // let filename = req.file.filename;
      // listing.image ={url,filename};
       if (req.file) {
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = { url, filename };
}
      await listing.save();
      req.flash("success","changes made successfully ...");

      
      res.redirect(`/listings/${id}`);
   };

   module.exports.deleteListing = async(req,res)=>{
     let{id}= req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","listing deleted...");
     res.redirect("/listings");
  };