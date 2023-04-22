import { Configuration, OpenAIApi } from 'openai';

import { dbConnection } from "../../utils/dbConnect";
import Post from "../../models/Post";
import { apiHandler } from "../../utils/api/api-handler";
import { getSession } from '../../utils/api/get-session';
// all functions in api and be used as api routing
// we should not fetch API route from getStaticProps or getStaticPaths 
// these two function should only include server-side code and never run client-side
// and code inside of them will not be sent to client browser

// a good use case would be to handle form input
// we can post form data to one of the api route and save it to database from there

// api route can also by dynamic

const configuration = new Configuration({
    apiKey: process.env.DALLE_API,
});

const openai = new OpenAIApi(configuration);

export default apiHandler({
    get: getImage
})

async function getImage(req, res){

    const session = await getSession(req, res);
    const data = await openai.createImage({
        prompt: req.query.prompt,
        n: 1,
        size: "512x512"
    });

    await session.commit();
    
    return res.status(200).json({
        data: data['data'],
        query: req.query
    });

}