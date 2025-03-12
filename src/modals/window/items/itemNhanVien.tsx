import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
interface INhanVien {
    id: string,
    code: string,
    name: string,
    birthday: string,
    isLeaved: boolean,
    note: string,
    departmentId: string,
    positionId: string,
    userId: string,
    tel: string,
    ext: string;
}
interface IProgs {
    item: INhanVien
}
const ItemNhanVien = (progs: IProgs) => {
    const { item } = progs;
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ fontWeight: "600" }}>{item.code}</Text>
                <Text style={{ fontWeight: "600", color: APP_COLOR.BG_ORANGE }}>{Helper.formatDate(item.birthday)}</Text>
            </View>
            <View style={styles.details}>
                <Text style={{ color: "gray", fontSize: 18 }}>{item.name}</Text>
                {(item.tel || item.ext) && <Text style={{ color: "gray" }}>{item.tel} {item.ext ? " - " + item.ext : ""}</Text>}
                {item.note && <Text style={{ color: "gray" }}>{item.note}</Text>}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    details: {

    }
})
export default ItemNhanVien;