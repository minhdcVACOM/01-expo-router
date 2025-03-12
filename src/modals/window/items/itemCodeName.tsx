import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
interface ICodeName {
    id: string,
    code: string,
    name: string
}
interface IProgs {
    item: ICodeName
}
const ItemCodeName = (progs: IProgs) => {
    const { item } = progs;
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "600" }}>{item.code}</Text>
            <Text style={{ color: "gray", fontSize: 18 }}>{item.name}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10
    }
})
export default ItemCodeName;