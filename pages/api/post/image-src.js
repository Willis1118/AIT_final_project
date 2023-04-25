import { apiHandler } from '../../../utils/api/api-handler';
import Post from '../../../models/Post';

export default apiHandler({
    post: postBase64,
    get: getBase64,
});

let imageSource = '';

function postBase64(req, res){

    imageSource = req.body.image;

    return res.status(200).json({});
};

function getBase64(req, res){

    return res.status(200).json({
        image: imageSource
    });
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
};