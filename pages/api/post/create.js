import { apiHandler } from '../../../utils/api/api-handler';
import Post from '../../../models/Post';
import { dbConnection } from '../../../utils/dbConnect';

export default apiHandler({
    post: create
});

async function create(req, res){

    await dbConnection();

    const post = new Post(req.body);

    try{
        await post.save();
    }catch(err){
        console.log(err);
    }

    return res.status(200).json({});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
};