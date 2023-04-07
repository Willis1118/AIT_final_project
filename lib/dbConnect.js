import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error(
        "Missing configuration route"
    );
}


/* to prevent connections from blowing up when calling api routes */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnection(){
    if(cached.conn){ return cached.conn; } //already connected

    if(!cached.promise){
        const mongooseOpts = {
            useNewUrlParser: true,  
            useUnifiedTopology: true
        };

        cached.promise = mongoose.connect(MONGODB_URI, mongooseOpts)
                                 .then(mongoose => { console.log("Connection established"); return mongoose; })
                                 .catch((err) => { throw new Error( "Connection fails" )});
        
        cached.conn = await cached.promise;
        return cached.conn
    }
}