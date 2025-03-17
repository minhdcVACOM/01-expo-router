import React from "react";
import { StyleSheet, Text, View } from "react-native";
interface ICodeName {
    id: string,
    code: String
}
interface IProgs {
    item: ICodeName
}
const ItemCode = (progs: IProgs) => {
    const { item } = progs;
    return (
        <Text style={{ fontWeight: "600" }}>{item.code}</Text>
    );
}
export default ItemCode;