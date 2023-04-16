import bcrypt from 'bcryptjs';

import { apiHandler } from '../../../utils/api/api-handler';
import { usersRepo } from '../../../utils/api/users-repo';
import { dbConnection } from '../../../lib/dbConnect';

export default apiHandler({
    post: register
});

async function register(req, res){
    const { password, ...user } = req.body;

    await dbConnection();

    const data = usersRepo.find(user);

    // validate
    if (data){
        throw `User with the username "${user.username}" already exists`;
    }
    
    // hash password
    user.hash = bcrypt.hashSync(password, 10);    

    usersRepo.create(user);
    return res.status(200).json({});
}