import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String, // user name
    email: String, // user email
    passwordHash: String, // hased user password
    posts: [ JournalSchema ], // reference to list of journal items
});

const JournalSchema = new mongoose.Schema({
    user: UserSchema, // reference to user object
    title: String, // title for the journal
    image: ImageSchema, // reference to image object
    tags: [ String ], // customized tags for the journal / image
    contents: String, // some comments or descriptions for the dream or anything user want to keep in the journal
});

const ImageSchema = new mongoose.Schema({
    user: UserSchema, // reference to user object
    prompt: String, // prompt for generating the image 
    content: {
        data: Buffer,
        contentType: String,
    },
    createdAt: { // timestamp
        type: Date,
        default: Date.now,
    },
});



await mongoose.connect('mongodb://localhost/final_project', mongooseOpts)
              .then(() => console.log('connection established'))
              .catch((e) => console.log(e))