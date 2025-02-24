import axios from "axios";
import { Helper } from "./helper";
import { Keyboard } from "react-native";
const vcAxios = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
// Add a request interceptor
vcAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    Keyboard.dismiss();
    config.headers["Accept-language"] = "vi";
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
    let _error = Helper.getError(error);
    if (_error) _error = { error: _error };
    return _error || Promise.reject(error);
});
export default vcAxios;