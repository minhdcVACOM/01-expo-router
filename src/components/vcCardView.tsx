import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
interface IProgs {
    children: any,
    cardStyle?: StyleProp<ViewStyle>
}
const VcCadView = (pros: IProgs) => {
    const { children, cardStyle } = pros;

    return (
        <View style={[styles.card, cardStyle]}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        fontWeight: "800",
        color: "#fff",
        paddingVertical: 5,
        marginBottom: 5,
    },
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 20,
        padding: 10
    }
})
export default VcCadView;