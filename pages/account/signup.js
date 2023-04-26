import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Loading } from '@nextui-org/react';

import { userService } from '../../utils/services/user-service';
import Layout from "../../components/layout";
import styles from "../../styles/login.module.css";

export default function Login(){
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string().email()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        console.log('signup session', user);

        return userService.register(user)
            .then(() => {
                // alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>
            <Layout>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <h2>Welcome to Dream Diffusion</h2>
                        <label htmlFor="firstname" >First Name: </label>
                        <input type="text" name="firstname" {...register('firstName')}/>
                        <div>{errors.firstName?.message}</div>
                        <label htmlFor="lastname" >Last Name: </label>
                        <input type="text" name="lastname" {...register('lastName')}/>
                        <div>{errors.lastName?.message}</div>
                        <label htmlFor="username" >Email: </label>
                        <input type="text" name="email" {...register('email')}/>
                        <div>{errors.email?.message}</div>
                        <label htmlFor="password" >Password: </label>
                        <input type="password" name="password" {...register('password')}/>
                        <div>{errors.password?.message}</div>
                        <Button disabled={formState.isSubmitting} type='submit'>
                            {formState.isSubmitting ? 
                                <Loading type='spinner' /> :
                                'Sign Up'
                            }
                        </Button>
                        <p>Already have an account? <Link href="/account/login">Log in</Link></p>
                    </form>
                </div>
            </Layout>
        </>
    )
}