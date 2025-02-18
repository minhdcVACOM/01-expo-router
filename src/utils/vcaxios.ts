import axios from "axios";
const vcAxios = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
// Add a request interceptor
vcAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
vcAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data || response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data || Promise.reject(error);
});
export default vcAxios;