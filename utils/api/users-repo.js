import User from '../../models/User';
import { dbConnection } from '../dbConnect';

export const usersRepo = {
    find,
    create,
}

async function find(data){
    let user = {};
    
    await dbConnection();

    try{
        user = await User.findOne(data);
    }catch(e){
        console.log(e);
    }

    return user;
}

async function create(data){
    let newUser = new User(data);

    await dbConnection();

    try{
        await newUser.save();
    }catch(e){
        console.log(e);
    }

    return newUser;
}
