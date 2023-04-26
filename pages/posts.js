import { useState, useEffect } from "react";
import { Loading } from "@nextui-org/react";

import Layout from "../components/layout";
import PostCard from "../components/post-card";
import { getSession } from '../utils/api/get-session';
import { dbConnection } from "../utils/dbConnect";
import Post from '../models/Post';
import User from '../models/User';

export async function getServerSideProps(context){

    await dbConnection();

    const session = await getSession(context.req, context.res);
    let user, posts;
    if(session.user){
        user = await User.findOne(session.user);
        posts = await Post.find({creator: user._id});
    }

    return {
        props: {
            posts: posts ? JSON.stringify(posts) : null,
            data: session.user ? session.user : null
        }
    };
}

export default function Posts({ posts, data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Layout sessionData={user}>
            {posts ? 
                JSON.parse(posts).map((post, idx) => {
                    return <PostCard key={idx} post={post} />
                })
            :   <Loading type='spinner' />
            }
        </Layout>
    )
}