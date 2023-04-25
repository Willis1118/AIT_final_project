import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";

import Post from '../../models/Post';
import User from '../../models/User';
import styles from '../../styles/post.module.css';
import Layout from "../../components/layout";
import { getRuntimeConfig } from "../../utils/getStaticPath";
import { getSession } from "../../utils/api/get-session";
import { postService } from '../../utils/services/post-service';

export async function getServerSideProps( context ){

    const session = await getSession(context.req, context.res);
    // const imageSource = postService.getBase64()
    //                                .then(data => console.log(data))
    //                                .catch(err => console.log('fetch error'));

    // console.log(context.req.headers);

    const response = await fetch(`${getRuntimeConfig().apiUrl}/post/image-src`, {
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    });
    const image = await response.json();

    return {
        props: {
            data: session.user ? session.user : null,
            image: image['image'],
        }
    }
}

export default function IndividualPost({ data, image }){

    const [user, setUser] = useState(null);
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // const images = JSON.parse(router.query.images);

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
                            {formState.isSubmitting && <span></span>}
                            Create
                        </button>
                </form>
            </div>
        </Layout>
    )
}