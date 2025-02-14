import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import VcButton from "@/components/vcbutton";
import TextLine from "@/components/textline";
import imgBackground from "@/assets/images/auth/welcome-background.png";
import logoFacebook from "@/assets/images/auth/facebook.png";
import logoGoogle from "@/assets/images/auth/google.png";
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        fontWeight: "600"
    },
    contentText: {
        fontSize: 40,
        fontWeight: "900",
        color: APP_COLOR.BG_ORANGE,
        marginVertical: 10
    },
    sloganText: {
        fontSize: 20,
        color: APP_COLOR.BG_PURPLE,
        fontStyle: "italic"
    }
});
const WelCome = () => {
    return (
        <ImageBackground style={{ flex: 1, alignSelf: "stretch" }} source={imgBackground}>
            <LinearGradient
                colors={['transparent', '#191b2f']} style={{ flex: 1 }}
                locations={[0.4, 0.8]}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.6, paddingLeft: 50, alignItems: "flex-start", justifyContent: "center" }}>
                        <Text style={styles.headerText}>Welcome to</Text>
                        <Text style={styles.contentText}>VACOM crm</Text>
                        <Text style={styles.sloganText}>Gìn giữ sự hài lòng</Text>
                    </View>
                    <View style={{ flex: 0.4, marginHorizontal: 20, gap: 10, justifyContent: "center" }}>
                        <TextLine text="Đăng nhập với" />
                        <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
                            <VcButton
                                title="Facebook"
                                btnStyle={{ backgroundColor: "white", width: 120, borderColor: "black" }}
                                textStyle={{ color: "back" }}
                                icon={(<Image source={logoFacebook} style={{ width: 20, height: 20 }} />)}
                                onPress={() => { alert("click me") }}
                            />
                            <VcButton
                                title="Google"
                                btnStyle={{ backgroundColor: "white", width: 120, borderColor: "black" }}
                                textStyle={{ color: "back" }}
                                icon={(<Image source={logoGoogle} style={{ width: 20, height: 20 }} />)}
                                onPress={() => { alert("click me") }}
                            />
                        </View>
                        <VcButton
                            title="Đăng nhập với Email"
                            onPress={() => { alert("click me") }}
                            btnStyle={{ borderColor: APP_COLOR.SECOND1 }}
                        />
                        <Text style={{ textAlign: "center", color: "white" }}>Quên mật khẩu? Đăng ký</Text>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}
export default WelCome;