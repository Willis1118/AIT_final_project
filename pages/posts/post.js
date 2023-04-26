import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";
import { Button, Loading } from "@nextui-org/react";

import Post from '../../models/Post';
import User from '../../models/User';
import styles from '../../styles/post.module.css';
import Layout from "../../components/layout";
import { getRuntimeConfig } from "../../utils/getStaticPath";
import { getSession } from "../../utils/api/get-session";
import { postService } from '../../utils/services/post-service';

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
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // re-render on mount
    useEffect(() => {
        setImage(localStorage.getItem('imageSrc'));
    },[]);

    useEffect(() => {
        setUser(data);
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
                                router.push('/posts');
                          })
                          .catch(err => console.log(err));
    }
    
    return (
        <Layout sessionData={user}>
            <div>
                <Image
                    src={`data:image/png;base64, ${image}`}
                    width={512}
                    height={512}
                    alt=''
                    priority
                />
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <h2>Welcome to Dream Diffusion</h2>
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
    )
}