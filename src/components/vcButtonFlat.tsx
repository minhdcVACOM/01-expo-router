import { ReactNode } from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native"
import { APP_COLOR } from "@/utils/constant";
import { View } from "react-native-animatable";

interface IProgs {
    pressStyle?: StyleProp<TextStyle>,
    viewStyle?: StyleProp<ViewStyle>,
    onPress: () => void,
    icon?: ReactNode,
    color?: string,
    title?: string,
    textStyle?: StyleProp<TextStyle>,
    backgroundColor?: string,
    type?: "blurry" | "clear"
}

const VcButtonFlat = (progs: IProgs) => {
    const { pressStyle, viewStyle, onPress, icon, color, title, textStyle, backgroundColor, type } = progs;
    return (
        <Pressable
            style={({ pressed }) =>
            ([{
                opacity: pressed ? (!type || type == "blurry" ? 1 : 0.4) : (!type || type == "blurry" ? 0.4 : 1)
            } as any, pressStyle])}
            onPress={onPress}>
            <View style={[{
                backgroundColor: icon ? backgroundColor ?? APP_COLOR.GRAYLIGHT : "transparent",
                gap: 10, padding: 5, borderRadius: 20,
                alignSelf: "center", margin: 5, justifyContent: "center", flexDirection: "row",
                borderWidth: icon ? 0.5 : 0,
                borderColor: APP_COLOR.PRIMARY2
            }, viewStyle]}>
                {icon}
                {title && <Text style={[{ fontWeight: "600", textDecorationLine: "underline", color: color || "black", textAlign: "center" }, textStyle]}>{title}</Text>}
            </View>
        </Pressable>
    )
}
export default VcButtonFlat;