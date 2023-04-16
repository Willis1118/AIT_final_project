import mongoose from 'mongoose';

import { User } from '../../models/User';

export const usersRepo = {
    find,
    create,
}

async function find(data){
    let user = {};

    try{
        user = await User.find(data);
    }catch(e){
        console.log(e);
    }

    return user;
}

async function create(data){
    let newUser = new User(data);

    try{
        await newUser.save();
    }catch(e){
        console.log(e);
    }

    return newUser;
}
