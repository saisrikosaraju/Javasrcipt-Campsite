const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports.createReview = async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "created a new review!");
    res.redirect(`/campgrounds/${campground._id}`);
}
//$pull is gonna take an id aand pull anything that matches that id out of the array of objects provided in this case reviews
module.exports.deleteReview = async(req,res)=>{
    const { id, reviewId } = req.params;
   await Campground.findByIdAndUpdate(id, {$pull:{ reviews : reviewId}});
   await Review.findByIdAndDelete(reviewId);
   req.flash("success", "Successfully deleted the review")
   res.redirect(`/campgrounds/${id}`);    
}