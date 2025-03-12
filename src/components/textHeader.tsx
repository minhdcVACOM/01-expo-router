import { StyleProp, StyleSheet, Text, TextStyle } from "react-native"
interface IProgs {
    title: string,
    textStyle?: StyleProp<TextStyle>
}
export const TextHeader = ({ title, textStyle }: IProgs) => {
    return (
        <Text style={[styles.text, textStyle]}>{title}</Text>
    )
}
const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        fontWeight: "600",
        paddingVertical: 15,
        fontSize: 20
    }
})