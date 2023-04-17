import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from './fetch-wrappers';
import getRuntimeConfig from '../components/getStaticPath';

// handle user functionality
// in client side, so process.env & getConfig are all not visible

const onServer = typeof window === 'undefined';
const userSubject = new BehaviorSubject(!onServer && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
}

function login(email, password) {
    return fetchWrapper.post(`/api/user/auth`, { email: email, password: password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            console.log("here?");
            // localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user) {
    return fetchWrapper.post(`/api/user/register`, user);
}

