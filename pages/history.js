import { useState, useEffect } from "react";
import { Loading, Grid } from "@nextui-org/react";
import Head from "next/head";

import Layout from "../components/layout";
import { getSession } from '../utils/api/get-session';
import { dbConnection } from "../utils/dbConnect";
import ImageCard from "../components/image-card";
import { postService } from "../utils/services/post-service";
import styles from '../styles/account.module.css';

export async function getServerSideProps(context){

    await dbConnection();

    const session = await getSession(context.req, context.res);
 
    // if(session.user){
    //     user = await User.findOne(session.user);
    //     images = await Image.find({creator: user}).sort({createdAt: -1}).limit(3);
    // }

    return {
        props: {
            // images: images ? JSON.stringify(images) : null,
            data: session.user ? session.user : null
        }
    };
}

export default function History({ data }){

    const [user, setUser] = useState(null);
    const [images, setImages] = useState(null);
    
    useEffect(() => {

        setUser(data);

        const fetchImages = async () => {
            const response = await postService.getHistoricImages(data);
            const imageSrc = JSON.parse(response['images']);
            setImages(imageSrc);
        }
        
        fetchImages();

    }, [data]);

    return (
        
            <Layout sessionData={user}>
                <Head>
                    <title>History</title>
                </Head>
                <div className={styles.container}>
                    <Grid.Container gap={3} justify="center">
                        {images ?
                                images.map((image, idx) => {
                                    return (
                                        <Grid key={idx} >
                                            <ImageCard image={image['image']} prompt={image['prompt']} />
                                        </Grid>
                                    )
                                })
                            : (<Grid>
                                <Loading color="secondary" size='lg'>Please wait while we fetch the data</Loading>
                            </Grid>)
                        }
                    </Grid.Container>
                </div>
            </Layout>
        
    )
}