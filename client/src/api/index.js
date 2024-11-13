import axios from 'axios';

const local = 'http://localhost:5000';
const heroku = 'https://memories-app-server-0a77c8fedce2.herokuapp.com';

//backend url
const API = axios.create({
    baseURL: local,
});

// const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`
    }

    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post('/user/signin', formData) 
export const signUp = (formData) => API.post('/user/signup', formData) 