import { useState, useEffect } from "react";

import Layout from "../components/layout";
import PostCard from "../components/post-card";
import { getSession } from '../utils/api/get-session';
import { dbConnection } from "../utils/dbConnect";
import Post from '../models/Post';

export async function getServerSideProps(context){

    await dbConnection();

    const session = await getSession(context.req, context.res);

    const posts = await Post.find({});

    return {
        props: {
            posts: JSON.stringify(posts),
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
            {JSON.parse(posts).map((post, idx) => {
                return <PostCard key={idx} image={post.image} title={post.title} />
            })}
        </Layout>
    )
}