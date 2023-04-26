import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    prompt: String, // user name
    title: String,
    content: String,
    image: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

module.exports = mongoose.models?.Post || mongoose.model("Post", PostSchema);