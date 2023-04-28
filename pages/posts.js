import { useState, useEffect } from "react";
import { Loading, Grid } from "@nextui-org/react";
import Head from "next/head";

import Layout from "../components/layout";
import PostCard from "../components/post-card";
import { getSession } from '../utils/api/get-session';
import { dbConnection } from "../utils/dbConnect";
import { postService } from "../utils/services/post-service";

export async function getServerSideProps(context){

    await dbConnection();

    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null
        }
    };
}

export default function Posts({ data }){

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    
    useEffect(() => {
        setUser(data);

        const fetchPosts = async () => {
            const response = await postService.getPosts(data.email);
            const postsSrc = JSON.parse(response['posts']);
            setPosts(postsSrc);
        }
        
        fetchPosts();
        
    }, [data]);

    return (
        <Layout sessionData={user}>
            <Head>
                <title>Posts</title>
            </Head>
            <Grid.Container gap={3} justify="center">
                {posts ? 
                    posts.map((post, idx) => {
                        return (
                            <Grid key={idx}>
                                <PostCard post={post} />
                            </Grid>
                        )
                    })
                : (<Grid>
                    <Loading color="secondary" size='lg'>Please wait while we fetch the data</Loading>
                  </Grid>)
                }
            </Grid.Container>
        </Layout>
    )
}