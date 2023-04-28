import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Loading, Grid } from '@nextui-org/react';
import { useState, useEffect, useRef } from 'react';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';
import ImageCard from '../components/image-card';
import { getSession } from '../utils/api/get-session';
import { postService } from '../utils/services/post-service';

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
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [fetch, setFetch] = useState(false);
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
        setFetch(true);

        return postService.getGeneratedImage(prompt)
               .then(data => {
                    setImage(data['data'][0]['b64_json']);
                    setPrompt(prompt);
                    setFetch(false);
                    postService.postImage(data['data'][0]['b64_json'], prompt, user).catch(err => console.log(err));
               })
               .catch((err) => {
                    if(err === 'Invalid Token'){
                        router.push('/account/signup');
                    }else{
                        router.push('/error');
                    }
               });
    }

    const handleRegenerate = (prompt, evt) => {
        console.log(formState.isSubmitted);
        onSubmit({prompt: prompt});
    }

    const handleCreate = (image, prompt, evt) => {

        localStorage.setItem('imageSrc', image);
        localStorage.setItem('prompt', prompt);
        router.push('/post');

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
                        <button disabled={formState.isSubmitting} type='submit'>{
                            formState.isSubmitting ? 
                            <Loading type="spinner" size='sm'/> :
                            'Submit'
                        }</button>
                    </form>
                    { image ? 
                    <div className={styles['image-card']}>
                        <ImageCard image={image} prompt={prompt}/> 
                        <Grid.Container gap={5} justify='center'>
                            <Grid><Button auto onPress={evt => handleRegenerate(prompt, evt)}>
                                { fetch ? 
                                <Loading type="spinner" size='sm'/> :
                                'Regenerate' }
                            </Button></Grid>
                            <Grid><Button auto onPress={evt => handleCreate(image, prompt, evt)}>Create Post</Button></Grid>
                        </Grid.Container>
                    </div> : 
                    (<></>)}
                </div>
            </Layout>
        </>
    )
}