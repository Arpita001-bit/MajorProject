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

 module.exports.createListing = async (req,res,next)=>{
  
 let url = req.file.path;
 let filename = req.file.filename;
       
     const newListings = new Listing(req.body.listing);
     newListings.owner = req.user._id; 
     newListings.image ={url,filename};
     await newListings.save();
     req.flash("success","new listing created...");
     res.redirect("/listings");
 
    
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

      let url = req.file.path;
      let filename = req.file.filename;
      listing.image ={url,filename};
      req.flash("success","changes made successfully ...");

      
      res.redirect(`/listings/${id}`);
   };

   module.exports.deleteListing = async(req,res)=>{
     let{id}= req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","listing deleted...");
     res.redirect("/listings");
  };