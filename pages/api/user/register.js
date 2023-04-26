import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import getConfig from 'next/config';

import { getSession } from '../../../utils/api/get-session';
import { apiHandler } from '../../../utils/api/api-handler';
import { dbConnection } from '../../../utils/dbConnect';
import User from '../../../models/User';

const { serverRuntimeConfig } = getConfig();

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
    const token = jwt.sign({ sub: user._id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    try{
        await newUser.save();
        session.user = newUser;
        session.token = token;
        await session.commit();
    }catch(e){
        console.log(e);
    }
    return res.status(200).json({});
}