var mongoose                = require("mongoose");
var passpoortLocalMongoose  = require("passport-local-mongoose");



var UserSchema    =  new mongoose.Schema({
    local :{
        username: String,
        password: String
    }
});
UserSchema.plugin(passpoortLocalMongoose)

module.exports = mongoose.model("User", UserSchema);