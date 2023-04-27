import { userService } from './user-service';

export const fetchWrapper = {
    get,
    post,
}

function get(url, query){
    const requestOption = {
        method: "GET",
        // headers: authHeader(url)
    };

    let urlQuery = url;

    if(query){
        urlQuery = url + '?' + new URLSearchParams(query).toString();
    }
    console.log('query url', urlQuery);

    return fetch(urlQuery, requestOption).then(handleResponse);
}

function post(url, body){

    const requestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, //, ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body),
    };

    return fetch(url, requestOption).then(handleResponse);
}

function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}