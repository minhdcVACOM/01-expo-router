import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { APP_COLOR } from "@/utils/constant";
import LoadingOverlay from "./overlay";
const styles = StyleSheet.create({
    btnContainer: {
        borderColor: APP_COLOR.MEDIUM,
        backgroundColor: APP_COLOR.BG_DARKRED,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    btnText: {
        color: APP_COLOR.PRIMARY_TEXT
    }
});
const bgColor = {
    info: APP_COLOR.BLUE,
    success: APP_COLOR.GREEN,
    danger: APP_COLOR.RED,
    warning: APP_COLOR.YELLOW,
    question: APP_COLOR.YELLOW,
    setting: APP_COLOR.PURPLE
}
interface IProgs {
    title?: string,
    onPress?: () => void,
    textStyle?: StyleProp<TextStyle>,
    pressStyle?: StyleProp<TextStyle>,
    btnStyle?: StyleProp<ViewStyle>,
    icon?: ReactNode,
    loading?: boolean,
    type?: "info" | "success" | "danger" | "warning" | "question" | "setting"
}
const VcButton = (progs: IProgs) => {
    const { title, onPress, textStyle, pressStyle, btnStyle, icon, loading, type } = progs;
    return (
        <Pressable
            disabled={loading}
            style={({ pressed }) =>
                ([{ opacity: pressed || loading ? 0.8 : 1, alignSelf: "stretch" } as any, pressStyle])}
            onPress={onPress}>
            <View style={[styles.btnContainer, { backgroundColor: bgColor[type ?? "danger"] }, btnStyle]}>
                {icon}
                {title && <Text style={[styles.btnText, textStyle]}>{title}</Text>}

                {loading &&
                    // @ts-ignore:next-line
                    <LoadingOverlay style={{ alignItems: "flex-end", backgroundColor: "transparent" }} color={textStyle?.color ?? APP_COLOR.PRIMARY_TEXT} />}
            </View>
        </Pressable>
    );
}

export default VcButton;