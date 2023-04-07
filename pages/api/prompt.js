import mongoose from "mongoose";

import { dbConnection } from "../../lib/dbConnect";
import User from '../../models/User'
// all functions in api and be used as api routing
// we should not fetch API route from getStaticProps or getStaticPaths 
// these two function should only include server-side code and never run client-side
// and code inside of them will not be sent to client browser

// a good use case would be to handle form input
// we can post form data to one of the api route and save it to database from there

// api route can also by dynamic

export default async function handler(req, res){
    const { method } = req;
    const pwd = "dheaf3234edhb184"; //dummy pwd

    await dbConnection(); // connect to db

    switch(method){
        case "GET":
            throw new Error("Not Implemented");
        case "POST":
            try{
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    passwordHash: pwd
                })
                await user.save();
                res.redirect(302, '/'); // next asks for the appropriate status code to process response
                // res.status(200).json({ success: true, content: user });
            } catch(e){
                console.log(e);
                res.status(404).json({ success: false });
            }
            break;
    }

    console.log(req.body);
}