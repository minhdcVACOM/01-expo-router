import { APP_COLOR } from "@/utils/constant";
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
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        padding: 10,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY1
    }
})
export default VcCadView;