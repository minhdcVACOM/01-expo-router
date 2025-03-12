import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
interface ISanPham {
    id: string,
    code: string,
    name: string,
    softwareTypeId: string,
    maintenanceContract: boolean,
    price: number
}
interface IProgs {
    item: ISanPham
}
const ItemSanPham = (progs: IProgs) => {
    const { item } = progs;
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ fontWeight: "600" }}>{item.code}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Text style={{ fontWeight: "600", color: APP_COLOR.PRIMARY2 }}>Bảo trì</Text>
                    <MaterialIcons name={item.maintenanceContract ? "check-box" : "check-box-outline-blank"} size={24} color={APP_COLOR.BG_ORANGE} />
                </View>
            </View>
            <View style={styles.details}>
                <Text style={{ color: "gray", fontSize: 18 }}>{item.name}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: "gray" }}>Giá bán:</Text>
                    <Text style={{ fontWeight: "600", fontSize: 15, color: APP_COLOR.BG_ORANGE, width: 150, textAlign: "right" }}>{Helper.currencyFormatter(item.price)}</Text>
                </View>
            </View>
        </View>
    );
}
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
export default ItemSanPham;