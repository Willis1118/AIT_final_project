import { useRouter } from "next/router";
import mongoose from "mongoose";
import Image from "next/image";

import { dbConnection } from "../../lib/dbConnect";
import Post from '../../models/Post';
import styles from '../../styles/post.module.css';
import Layout from "../../components/layout";

export async function getServerSideProps( context ){

    await dbConnection();

    const posts = await Post.find({});
    const post = posts[0].prompt;

    return {
        props: {
            post,
        }
    }
}

export default function IndividualPost({ post }){
    
    const { query } = useRouter();

    console.log(post);
    
    return (
        <Layout>
            <div>
                <Image
                    priority
                    src="/image/Samoyed.png"
                    height={290}
                    width={510}
                    alt=""
                    className={styles.img}
                />
                <p className={styles.post}>You dream is: {post}</p>
                <p className={styles.post}>Don't worry! This cute Samoyed will take care of everything for you!</p>
            </div>
        </Layout>
    )
}