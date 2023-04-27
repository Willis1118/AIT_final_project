import { useState, useEffect } from "react";

import Layout from "../components/layout";
import { getSession } from '../utils/api/get-session';
import { dbConnection } from "../utils/dbConnect";
import User from '../models/User';
import Image from '../models/Image';
import ImageCard from "../components/image-card";

export async function getServerSideProps(context){

    await dbConnection();

    const session = await getSession(context.req, context.res);

    let user, images;
    if(session.user){
        user = await User.findOne(session.user);
        images = await Image.find({creator: user});
    }

    return {
        props: {
            images: images ? JSON.stringify(images) : null,
            data: session.user ? session.user : null
        }
    };
}

export default function History({ images, data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Layout sessionData={user}>
            {images ? 
                JSON.parse(images).map((image, idx) => {
                    if(idx < 8){
                        return <ImageCard key={idx} image={image['image']} prompt={image['prompt']} />
                    }
                })
            :   <Loading type='spinner' />
            }
        </Layout>
    )
}