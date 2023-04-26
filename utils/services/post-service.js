import { fetchWrapper } from "./fetch-wrappers"


export const postService = {
    getImage,
    postImage,
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

function postImage(image, prompt, user){
    return fetchWrapper.post('/api/post/image', { image: image, prompt: prompt, user: user })
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