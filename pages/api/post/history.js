import { apiHandler } from '../../../utils/api/api-handler';
import Image from '../../../models/Image';
import User from '../../../models/User';
import Post from '../../../models/Post';
import { dbConnection } from '../../../utils/dbConnect';

export default apiHandler({
    post: getImages,
    get: getPosts,
});

async function getImages(req, res){
    const { email } = req.body;

    await dbConnection();
    
    const newUser = await User.findOne({ email: email });
    const images = await Image.find({ creator: newUser }).sort({createdAt: -1}).limit(4);

    return res.status(200).json({
        images: JSON.stringify(images),
    })
}

async function getPosts(req, res){
    const { email } = req.query;

    await dbConnection();

    const newUser = await User.findOne({ email: email });
    const posts = await Post.find({ creator: newUser }).sort({createdAt: -1}).limit(4);

    return res.status(200).json({
        posts: JSON.stringify(posts)
    })
}

export const config = {
    api: {
        responseLimit: '4.5mb',
    }
};