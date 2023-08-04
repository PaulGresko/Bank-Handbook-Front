import axios from "axios";
import NProgress from "nprogress"
import 'nprogress/nprogress.css'



export const API_URL = 'http://localhost:9090';
const login = 'admin';
const password = 'admin';


const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use(config=>{
    NProgress.start();
    config.headers.Authorization='Basic '+ btoa(login + ':' + password);
    return config;
}, error => {
    return Promise.reject(error);
});

$api.interceptors.response.use(response=>{
    NProgress.done();
    return response;
}, error => {
    NProgress.done();
    return Promise.reject(error);
});
export default $api;