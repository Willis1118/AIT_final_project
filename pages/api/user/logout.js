import { apiHandler } from '../../../utils/api/api-handler';
import { getSession } from '../../../utils/api/get-session';


export default apiHandler({
    post: logout
});

async function logout(req, res){
    // const { email, password } = req.body;
    const session = await getSession(req, res);

    try{
        await session.destroy();
    }catch(e){ // keep this catch will enabling logout
        console.log('session commit error', e);
    }

    return res.status(200).json({});
}