const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//to add unique username and password fields
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);
