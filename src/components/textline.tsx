import { StyleSheet, Text, View } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        marginVertical: 10
    },
    line: {
        borderBottomWidth: 1
    },
    text: {
        position: "relative",
        top: 10
    }
});
interface IProgs {
    text: string,
    color?: string,
    sizeLine?: number
}
const TextLine = (progs: IProgs) => {
    const { text } = progs;
    const color = progs.color ?? "white";
    const sizeLine = progs.sizeLine ?? 40;
    return (
        <View style={styles.container}>
            <View style={[styles.line, { borderBottomColor: color, paddingHorizontal: sizeLine }]}></View>
            <Text style={[styles.text, { color: color }]}>{text}</Text>
            <View style={[styles.line, { borderBottomColor: color, paddingHorizontal: sizeLine }]}></View>
        </View>
    );
}
export default TextLine;