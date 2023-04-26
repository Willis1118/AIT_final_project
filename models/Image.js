import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    image: String,
    prompt: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.models?.Image || mongoose.model('Image', ImageSchema);