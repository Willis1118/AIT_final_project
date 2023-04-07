import { useRouter } from "next/router";
import mongoose from "mongoose";
import Image from "next/image";

// import Post from '../../models/Post';
import styles from '../../styles/post.module.css';
import Layout from "../../components/layout";

// export async function getServerSideProps( context ){
//     const { id } = context.query;

//     return {
//         props: {
//             id,
//         }
//     }
// }

export default function Post({ id }){
    
    const { query } = useRouter();
    
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
                <p className={styles.post}>You dream is: {query.prompt}</p>
                <p className={styles.post}>Don't worry! This cute Samoyed will take care of everything for you!</p>
            </div>
        </Layout>
    )
}