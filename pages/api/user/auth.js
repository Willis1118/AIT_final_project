import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import getConfig from 'next/config';

import { apiHandler } from '../../../utils/api/api-handler';
import { dbConnection } from '../../../utils/dbConnect';
import { getSession } from '../../../utils/api/get-session';
import User from '../../../models/User';


const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const { email, password } = req.body;
    const session = await getSession(req, res);

    await dbConnection();

    const user = await User.findOne({email: email});

    // validate
    if (!(user && bcrypt.compareSync(password, user.password))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user._id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    session.user = user;
    await session.commit();

    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token
    });
}