import { StyleSheet, Text, View } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        marginVertical: 10
    },
    line: {
        borderBottomWidth: 1,
        paddingHorizontal: 50
    },
    text: {
        position: "relative",
        top: 10
    }
});
interface IProgs {
    text: string,
    color?: string
}
const TextLine = (progs: IProgs) => {
    const { text } = progs;
    const color = progs.color ?? "white";
    return (
        <View style={styles.container}>
            <View style={[styles.line, { borderBottomColor: color }]}></View>
            <Text style={[styles.text, { color: color }]}>{text}</Text>
            <View style={[styles.line, { borderBottomColor: color }]}></View>
        </View>
    );
}
export default TextLine;