import SweetAlert from "@/components/sweetalert";
import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import React from "react";
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";

const AppLayout = () => {
    setStatusBarStyle("light");
    return (
        <RootSiblingParent>
            {/* <StatusBar style="light" backgroundColor={APP_COLOR.BG_DARKRED} /> */}
            <SafeAreaView style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: APP_COLOR.PRIMARY2
                        },
                        headerTintColor: "#fff"
                    }}
                >
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="start" options={{ headerShown: false }} />
                    <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)/forgotpass" options={{ headerShown: false }} />
                    <Stack.Screen name="lstdvcs" options={{ headerShown: false }} />
                    <Stack.Screen name="setting" options={{ title: "Cài đặt" }
                    } />
                </Stack>
            </SafeAreaView>
            <SweetAlert />
        </RootSiblingParent >
    );
}
export default AppLayout;