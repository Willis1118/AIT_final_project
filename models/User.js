import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String, // user name
    email: String, // user email
    password: String, // hased user password
});

module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);