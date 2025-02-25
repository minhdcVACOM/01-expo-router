import { StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { Redirect } from "expo-router";
import LoginScreen from "./(auth)/login";
import BackGroundScreen from "@/components/backgroundscreen";
import React from "react";
// @ts-ignore:next-line
import image from "@/assets/images/auth/screen3.jpg";
import SweetAlert from "@/components/sweetalert";

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        fontWeight: "600"
    },
    contentText: {
        fontSize: 40,
        fontWeight: "900",
        color: APP_COLOR.BG_ORANGE
    },
    sloganText: {
        fontSize: 20,
        color: APP_COLOR.BG_PURPLE,
        fontStyle: "italic"
    }
});
const StartScreen = () => {
    // if (true) {
    //     return (
    //         <Redirect href={"/(auth)/forgotpass"} />
    //     );
    // }
    return (
        <BackGroundScreen image={image} colorGradient="#000">
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingLeft: 50, alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={styles.headerText}>Welcome to</Text>
                    <Text style={styles.contentText}>VACOM <Text style={{ color: APP_COLOR.BG_DARKRED }}>crm</Text></Text>
                    <Text style={styles.sloganText}>Gìn giữ sự hài lòng</Text>
                </View>
                <LoginScreen />
                <SweetAlert />
            </View>
        </BackGroundScreen>
    );
}
export default StartScreen;