import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { useState, useEffect } from 'react';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';
import { getSession } from '../utils/api/get-session';
import { promptService } from '../utils/services/prompt-service';
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
    const router = useRouter();

    useEffect(() => {
        setUser(data);
    }, [data]);

    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required('Password is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = ({ prompt }) => {
        return promptService.getData(prompt)
               .then(() => {
                    router.push('/posts');
               })
               .catch((err) => {
                    console.log(err);
               });
    }

    console.log("frontend session", user);

    return (
        <>
            <Layout sessionData={user} handler={null}> { /* this will give true on home */}
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
                            required={true}
                        />
                        <div>{errors.prompt?.message}</div>
                        <input type="submit" />
                    </form>
                </div>
            </Layout>
        </>
    )
}