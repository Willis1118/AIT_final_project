import { fetchWrapper } from "./fetch-wrappers"


export const postService = {
    getImage,
    postBase64,
    getBase64,
    createPost,
}

function getImage(prompt){
    const query = {
        prompt: prompt
    }

    return fetchWrapper.get('/api/post/prompt', query)
           .then(data => {
                return data;
           });
}

function postBase64(image){
    return fetchWrapper.post('/api/post/image-src', { image: image })
                       .then(data => {
                            return data;
                       });
}

function getBase64(){
    return fetchWrapper.get('/api/post/image-src')
                       .then(data => {
                            return data;
                       });
}

function createPost(post){
    return fetchWrapper.post('/api/post/create', post)
                       .then(data => {
                            return data;
                       });
}