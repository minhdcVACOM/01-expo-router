import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, View } from "react-native";
// @ts-ignore:next-line
import screen from "@/assets/images/auth/screen1.jpg";
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        <LinearGradient colors={[APP_COLOR.RED_BG1, APP_COLOR.RED_BG2]} style={styles.container}>
            {children}
        </LinearGradient>
        // <ImageBackground style={styles.img} source={image ?? screen}>
        //     <LinearGradient
        //         colors={['transparent', colorGradient ?? 'transparent']}
        //         style={styles.gradient}
        //         locations={[0.4, 0.8]}
        //     >
        //         {children}
        //     </LinearGradient>
        // </ImageBackground>
    );
}
export default BackGroundScreen;