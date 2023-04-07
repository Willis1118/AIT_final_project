import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String, // user name
    email: String, // user email
    passwordHash: String, // hased user password
    //posts: [ JournalSchema ], // reference to list of journal items
});

module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);