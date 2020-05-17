const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  userName: { type: String, required: true, unique: false },//needs to be changed
  photoUrl: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  authToken: { type: String, required: false },
  idToken: { type: String, required: false },
  provider: { type: String, required: false },
  providerId: { type: String, required: false },
  isRegisteredAsNativeUser:{type:Boolean,required:true}
},{timestamps:true});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema); //collection:users
