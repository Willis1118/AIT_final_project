import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { getSession } from '../../../utils/api/get-session';

import { apiHandler } from '../../../utils/api/api-handler';
import { usersRepo } from '../../../utils/api/users-repo';
import { dbConnection } from '../../../utils/dbConnect';
import User from '../../../models/User';

export default apiHandler({
    post: register
});

async function register(req, res){
    const { password, ...user } = req.body;
    const session = await getSession(req, res);

    await dbConnection();

    const data = await User.findOne(user);

    // validate
    if (data){
        throw `User with the username "${user.email}" already exists`;
    }
    
    // hash password
    user.password = bcrypt.hashSync(password, 10);
    user._id = new mongoose.Types.ObjectId();

    const newUser = new User(user);
    try{
        await newUser.save();
        session.user = newUser;
        await session.commit();
    }catch(e){
        console.log(e);
    }
    return res.status(200).json({});
}