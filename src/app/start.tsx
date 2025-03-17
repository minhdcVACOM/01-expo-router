import { StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import LoginScreen from "./(auth)/login";
import React from "react";
import SweetAlert from "@/components/sweetalert";

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        fontWeight: "600"
    },
    contentText: {
        fontSize: 60,
        fontWeight: "900",
        color: "#fff"
    },
    appNameTex: {
        color: "#fff",
        fontSize: 25,
        position: "absolute",
        top: 0,
        right: -40,
        fontWeight: "900",
        paddingBottom: 5,
        paddingHorizontal: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50
    },
    sloganText: {
        fontSize: 20,
        color: APP_COLOR.GRAYLIGHT,
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
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View>
                    <Text style={styles.contentText}>VACOM</Text><Text style={styles.appNameTex}>crm</Text>
                </View>
                <Text style={styles.sloganText}>Gìn giữ sự hài lòng</Text>
            </View>
            <LoginScreen />
            <SweetAlert />
        </View>
    );
}
export default StartScreen;