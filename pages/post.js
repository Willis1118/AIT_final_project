import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Head from "next/head";
import { Loading } from "@nextui-org/react";

import User from '../models/User';
import styles from '../styles/post.module.css';
import Layout from "../components/layout";
import ImageCard from "../components/image-card";
import { getSession } from "../utils/api/get-session";
import { postService } from '../utils/services/post-service';

export async function getServerSideProps( context ){

    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null,
        }
    }
}

export default function IndividualPost({ data }){

    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState(null);
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => {
        setUser(data);
        setImage(localStorage.getItem('imageSrc'));
        setPrompt(localStorage.getItem('prompt'));
    }, [data]);

    const onSubmit = async ({ title, content }) => {
        const newPost = {
            title: title,
            content: content,
            image: image,
            creator: new User(user),
        }

        return postService.createPost(newPost)
                          .then(() => {
                                localStorage.removeItem('imageSrc');
                                localStorage.removeItem('prompt');
                                router.push('/posts');
                          })
                          .catch((err) => {
                                if(err === 'Invalid Token'){
                                    router.push('/account/signup');
                                }else{
                                    router.push('/error');
                                }
                            });
    }
    
    return (
        <>
            <Head>
                <title>Create Post</title>
            </Head>
            <Layout sessionData={user}>
                <div className={styles.container}>
                    <ImageCard
                            image={image}
                            prompt={prompt}
                    />
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <h2>Create Your Dream</h2>
                        <label htmlFor="title" >Title: </label>
                        <input type="text" name="title" {...register('title')}/>
                        <div>{errors.title?.message}</div>
                        <label htmlFor="content" >Content: </label>
                        <textarea name="content" {...register('content')}/>
                        <button disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? 
                                <Loading type='spinner' /> :
                                'Create'
                            }
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    )
}