import { BehaviorSubject } from 'rxjs';

import { fetchWrapper } from './fetch-wrappers';

// handle user functionality
// in client side, so process.env & getConfig are all not visible

export const userService = {
    login,
    logout,
    register,
}

function login(email, password) {
    return fetchWrapper.post(`/api/user/auth`, { email: email, password: password })
        .then(user => {
            return user;
        });
}

function logout(user) {
    return fetchWrapper.post('/api/user/logout', user);
}

function register(user) {
    return fetchWrapper.post(`/api/user/register`, user);
}

