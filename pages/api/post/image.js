import { apiHandler } from '../../../utils/api/api-handler';
import Image from '../../../models/Image';
import User from '../../../models/User';
import { dbConnection } from '../../../utils/dbConnect';

export default apiHandler({
    post: postImage,
});

async function postImage(req, res){

    const { image, prompt, user } = req.body;

    await dbConnection();

    const newUser = new User(user);
    const newImage = new Image({
        image: image, 
        prompt: prompt,
        creator: newUser
    });

    try{
        await newImage.save();
    }catch(err){
        console.log(err);
    }

    return res.status(200).json({});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '11mb'
        }
    }
};