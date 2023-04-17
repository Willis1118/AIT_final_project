import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    prompt: String, // user name
},{
    timestamps: true
});

module.exports = mongoose.models?.Post || mongoose.model("Post", PostSchema);