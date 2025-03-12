import { APP_COLOR } from "@/utils/constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface Iprogs {
    _key: string,
    onPress: () => void,
    onLongPress: () => void,
    iconName: string,
    isFocused: boolean,
    label: string
}
const VcTabbarButton = (progs: Iprogs) => {
    const { onPress, onLongPress, iconName, isFocused, label } = progs;
    const color = isFocused ? APP_COLOR.BG_DARKRED : APP_COLOR.PRIMARY1;
    const scale = useSharedValue(0);
    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused])
    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);
        return {
            opacity: opacity
        }
    });
    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
        const top = interpolate(scale.value, [0, 1], [0, 12]);
        return {
            transform: [{
                scale: scaleValue
            }],
            top: top
        };
    })
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
        >
            <Animated.View style={animatedIconStyle}>
                <FontAwesome5 name={iconName} size={24} color={color} />
            </Animated.View>
            <Animated.Text style={[{ color: color, fontWeight: "600" }, animatedTextStyle]}>{(typeof label === "string") ? label : ""}</Animated.Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})

export default VcTabbarButton;