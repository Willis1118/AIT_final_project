import { useState, useEffect } from "react";

import { dbConnection } from "../../utils/dbConnect";
import { getSession } from "../../utils/api/get-session";
import Post from '../../models/Post';
import styles from '../../styles/post.module.css';
import Layout from "../../components/layout";

export async function getServerSideProps( context ){

    await dbConnection();
    const session = await getSession(context.req, context.res);

    const posts = await Post.find({});
    const post = posts[posts.length-1].prompt;

    return {
        props: {
            post: post,
            data: session.user ? session.user : null,
        }
    }
}

export default function IndividualPost({ post, data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);
    
    return (
        <Layout sessionData={user}>
            <div>
                <p className={styles.post}>You dream is: {post}</p>
                <p className={styles.post}>Don't worry! This cute Samoyed will take care of everything for you!</p>
            </div>
        </Layout>
    )
}