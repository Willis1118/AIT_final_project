import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '@nextui-org/react';


import { useState, useEffect } from 'react';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';
import ImageCard from '../components/image-card';
import { getSession } from '../utils/api/get-session';
import { postService } from '../utils/services/post-service';
import { userService } from '../utils/services/user-service';

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null,
        }
    };
}

export default function Home({ data }){

    const [user, setUser] = useState(null);
    const [images, setImages] = useState(null);
    const [prompt, setPrompt] = useState('');
    const router = useRouter();

    useEffect(() => {
        setUser(data);
    }, [data]);

    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required('prompt is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = ({ prompt }) => {

        return postService.getImage(prompt)
               .then(data => {
                    console.log('receive data', data['data']);
                    setImages(data['data']);
                    setPrompt(prompt);
               })
               .catch((err) => {
                    console.log(err);
               });
    }

    const handleRegenerate = (prompt, evt) => {
        onSubmit({prompt: prompt});
    }

    const handleCreate = (image, evt) => {
        return postService.postBase64(image)
                          .then(data => {
                                router.push('/posts/post');
                          });
    }

    console.log("frontend session", user);

    return (
        <>
            <Layout sessionData={user}> { /* this will give true on home */}
                <Head>
                    <title>Dream Diffusion</title>
                </Head>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <label htmlFor="description" className={styles.label}> Start Dreaming: <a>(or should we do it for you?)</a></label>
                        <input 
                            {...register('prompt')}
                            type="text" 
                            name="prompt" 
                            placeholder="Who lurks into your dream..." 
                        />
                        <div>{errors.prompt?.message}</div>
                        <button disabled={formState.isSubmitting}>Submit</button>
                    </form>
                </div>
                { images ? 
                <div>
                    <ImageCard src={`data:image/png;base64, ${images[0]['b64_json']}`} prompt={prompt}/> 
                    <Button bordered color='#333' onPress={evt => handleRegenerate(prompt, evt)}>Regenerate</Button>
                    <Button bordered color='#333' onPress={evt => handleCreate(images[0]['b64_json'], evt)}>Create Post</Button>
                </div> : 
                (<></>)}
            </Layout>
        </>
    )
}