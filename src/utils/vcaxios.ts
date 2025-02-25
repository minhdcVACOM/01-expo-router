import axios from "axios";
import { Helper } from "./helper";
import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_KEY } from "./constant";

const vcAxios = axios.create(
    // { baseURL: process.env.EXPO_PUBLIC_API_URL }
);
const getBaseUrl = async () => {
    try {
        return await AsyncStorage.getItem(APP_KEY.KEY_API) ?? process.env.EXPO_PUBLIC_API_URL;
    } catch (error) {
        return process.env.EXPO_PUBLIC_API_URL;
    }
}
const getToken = async () => {
    try {
        return await AsyncStorage.getItem(APP_KEY.KEY_TOKEN);
    } catch (error) {
        return null;
    }
}
// Add a request interceptor
vcAxios.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const baseURL = await getBaseUrl();
    if (baseURL) config.baseURL = baseURL;
    const token = await getToken();
    if (token) config.headers["Authorization"] = "Bearer " + token;
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