import { fetchWrapper } from "./fetch-wrappers"


export const promptService = {
    getData,
}

function getData(prompt){
    const query = {
        prompt: prompt
    }

    return fetchWrapper.get('/api/prompt', query)
           .then(data => {
                return data;
           });
}