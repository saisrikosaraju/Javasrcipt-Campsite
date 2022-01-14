const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("database connected");
})
const sample = array => array[Math.floor(Math.random()*array.length)];

const seeddb = async()=>{
    await Campground.deleteMany({});
    for( let i=0; i<300; i++ ){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30)+10;
        const camp = new Campground({
            author: "60f9926909ecb2106b35f3bf",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsam ipsa quisquam doloribus pariatur cumque praesentium animi soluta amet quas. Tempora sint labore doloribus architecto, recusandae aspernatur dolorem iste nulla",
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmrzgqnlh/image/upload/v1627057627/YelpCamp/c20ciyqhfmognpv24rys.webp',
                  filename: 'YelpCamp/c20ciyqhfmognpv24rys'
                },
                {
                  url: 'https://res.cloudinary.com/dmrzgqnlh/image/upload/v1627057627/YelpCamp/zmzucv33pjmcewijbi2k.webp',
                  filename: 'YelpCamp/zmzucv33pjmcewijbi2k'
                }
              ]
        })
        await camp.save();
    }
}
seeddb().then(()=>{
    mongoose.connection.close();
})