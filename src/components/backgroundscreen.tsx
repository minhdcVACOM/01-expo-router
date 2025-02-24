import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, View } from "react-native";
// @ts-ignore:next-line
import screen from "@/assets/images/auth/screen2.jpg";
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    img: {
        flex: 1,
        alignSelf: "stretch"
    },
    gradient: {
        flex: 1
    }
})
interface IProgs {
    children: any,
    image?: string,
    colorGradient?: string
}
const BackGroundScreen = (pros: IProgs) => {
    const { children, image, colorGradient } = pros;
    return (
        <ImageBackground style={styles.img} source={image ?? screen}>
            <LinearGradient
                colors={['transparent', colorGradient ?? 'transparent']}
                style={styles.gradient}
                locations={[0.4, 0.8]}
            >
                {children}
            </LinearGradient>
        </ImageBackground>
    );
}
export default BackGroundScreen;