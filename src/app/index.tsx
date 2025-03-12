import { View } from "react-native-animatable";
import StartScreen from "./start";
import React, { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_KEY } from "@/utils/constant";
import { apiLogin } from "@/utils/api";
import { useRouter } from "expo-router";
SplashScreen.preventAutoHideAsync();
interface IForm {
    tenant: string,
    userName: string,
    passWord: string,
    remember?: boolean
}
const appRoot = () => {
    const router = useRouter();
    useEffect(() => {
        async function prepare() {
            try {
                const sInfoLogin = await AsyncStorage.getItem(APP_KEY.KEY_LOGIN);
                const infoLogin: IForm = sInfoLogin ? JSON.parse(sInfoLogin) : null;
                if (infoLogin) {
                    router.replace({
                        pathname: "/start"
                    });
                    // apiLogin(infoLogin.tenant, infoLogin.userName, infoLogin.passWord, async (res) => {
                    //     if (!res.error) {
                    //         router.replace({
                    //             pathname: "/lstdvcs",
                    //             params: res
                    //         });
                    //     } else {
                    //         router.replace({
                    //             pathname: "/start"
                    //         });
                    //     }
                    // })
                } else {
                    router.replace({
                        pathname: "/start"
                    });
                }
            } catch (e) {
                console.warn(e);
            } finally {
                SplashScreen.hide();
            }
        }
        prepare();
    }, []);
    return (
        <>
        </>
        // <View style={{ flex: 1 }}>
        //     <StartScreen />
        // </View>
    );
}
export default appRoot;