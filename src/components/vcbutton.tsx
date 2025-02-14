import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { APP_COLOR } from "@/utils/constant";
const styles = StyleSheet.create({
    btnContainer: {
        borderColor: APP_COLOR.PRIMARY1,
        backgroundColor: APP_COLOR.PRIMARY2,
        borderWidth: 1,
        borderRadius: 20,
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
interface IProgs {
    title: string,
    onPress?: () => void,
    textStyle?: StyleProp<TextStyle>,
    pressStyle?: StyleProp<TextStyle>,
    btnStyle?: StyleProp<ViewStyle>,
    icon?: ReactNode
}
const VcButton = (progs: IProgs) => {
    const { title, onPress, textStyle, pressStyle, btnStyle, icon } = progs;
    return (
        <Pressable
            style={({ pressed }) =>
                ([{ opacity: pressed === true ? 0.8 : 1, alignSelf: "stretch" } as any, pressStyle])}
            onPress={onPress}>
            <View style={[styles.btnContainer, btnStyle]}>
                {icon}
                <Text style={[styles.btnText, textStyle]}>{title}</Text>
            </View>
        </Pressable>
    );
}

export default VcButton;