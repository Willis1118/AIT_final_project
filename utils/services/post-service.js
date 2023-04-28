import { fetchWrapper } from "./fetch-wrappers"

export const postService = {
    getGeneratedImage,
    getHistoricImages,
    postImage,
    createPost,
    getPosts,
}

function getGeneratedImage(prompt){
    const query = {
        prompt: prompt
    }

    return fetchWrapper.get('/api/post/prompt', query)
           .then(data => {
                return data;
           });
}

function getHistoricImages(user){
    return fetchWrapper.post('/api/post/history', user)
                       .then(data => {
                            return data;
                       })
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

function getPosts(email){
    return fetchWrapper.get('/api/post/history', { email: email })
                       .then(data => {
                            return data;
                       })
}