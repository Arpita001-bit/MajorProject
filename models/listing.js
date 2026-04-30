
const mongoose = require("mongoose");
const Review = require("./review");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:String,
    
    // images:{
    //     default:"https://images.unsplash.com/photo-1761666254267-afe141cdc951?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600",
    //     type:String,
    //     set:(v)=>v===""?"https://images.unsplash.com/photo-1761666254267-afe141cdc951?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600":v,
    // },
    image: {
 
  url:String,
  filename:String,

    
},

    price:Number,
    location:String,
    country:String,
    reviews:[{
      type:Schema.Types.ObjectId,
      ref:"Review",
    },],
    owner : {
    type : Schema.Types.ObjectId,
    ref: "User",
    }
});

//CREATING POST MONGOSH MIDDLE WEAR

listingSchema.post("findOneAndDelete",async( listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports= Listing;