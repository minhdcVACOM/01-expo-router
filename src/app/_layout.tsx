import { Stack } from "expo-router";
import React from "react";
import { RootSiblingParent } from 'react-native-root-siblings';
import {
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { StatusBar } from "react-native";
import BackGroundScreen from "@/components/backgroundscreen";
import { Provider } from "react-redux";
import { vcStore } from "@/redux/vcStore";
import SweetAlert from "@/components/sweetalert";
const AppLayout = () => {
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };
    return (
        <>
            <StatusBar hidden={true} />
            <BackGroundScreen>
                <RootSiblingParent>
                    <Provider store={vcStore}>
                        {/* <SafeAreaView style={{ flex: 1 }}> */}
                        <ThemeProvider value={navTheme}>
                            <Stack
                            // screenOptions={{
                            //     headerStyle: {
                            //         backgroundColor: APP_COLOR.PRIMARY2
                            //     },
                            //     headerTintColor: "#fff"
                            // }}
                            >
                                <Stack.Screen name="index" options={{ headerShown: false }} />
                                <Stack.Screen name="start" options={{ headerShown: false }} />
                                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                                <Stack.Screen name="(auth)/forgotpass" options={{ headerShown: false }} />
                                <Stack.Screen name="lstdvcs" options={{ headerShown: false }} />
                                <Stack.Screen name="setting" options={{ headerShown: false, title: "Cài đặt" }} />
                                <Stack.Screen name="windowView" options={{ headerShown: false }} />
                            </Stack>
                        </ThemeProvider>
                        {/* </SafeAreaView> */}
                    </Provider>
                </RootSiblingParent >
            </BackGroundScreen>
            <SweetAlert />
        </>
    );
}
export default AppLayout;