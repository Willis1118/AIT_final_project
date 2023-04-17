import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Link from 'next/link';

import { userService, alertService } from '../../utils/user-service';

import styles from '../../styles/login.module.css';

export default function UserForm(props){
    console.log(props);

    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();

    // form validation from yup
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    if(!isAddMode){
        formOptions.defaultValues = props.user; //
    }

    // get functions to build with useForm hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data){
        return isAddMode ?
               createUser(data) :
               updateUser(user.id, data);
    }

    function createUser(data){
        return userService.register(data)
                          .then(() => {
                            alertService.success('User added', { keepAfterRouteChange: true });
                            router.push('/');
                          })
                          .catch(alertService.error);
    }

    function updateUser(id, data){
        return userService.update(id, data)
                          .then(() => {
                            alertService.success('User updated', { keepAfterRouteChange: true });
                            router.push('..');
                          })
                          .catch(alertService.error);
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Welcome to Dream Diffusion</h2>
                <label htmlFor="username" >Email: </label>
                <input type="text" name="username" {...register('username')}/>
                <div>{errors.email?.message}</div>
                <label htmlFor="password" {...register('password')}>Password: </label>
                <input type="text" name="password" />
                <div>{errors.password?.message}</div>
                <input type="submit" value="Login" />
                {isAddMode ? <p>Already have an account? <Link href="/account/login">Log in</Link></p> : <></>}
            </form>
        </div>
    )
}