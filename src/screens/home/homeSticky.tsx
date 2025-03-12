import { apiGetDashboardListCode } from "@/utils/apiHome";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLOR } from "@/utils/constant";
import VcCadView from "@/components/vcCardView";
const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: APP_COLOR.SECOND2,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2,
        flexDirection: "row",
        gap: 5
    },
    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingBottom: 10
    }
})
interface IData {
    code: string,
    label: string,
    icon: string,
    backColor: string,
    total: number
}
const HomeSticky = () => {
    const [data, setData] = useState<IData[]>([]);
    useEffect(() => {
        apiGetDashboardListCode(res => setData(res))
    }, []);
    return (
        <VcCadView cardStyle={{ flexDirection: "row", marginHorizontal: 0, marginVertical: 0, borderRadius: 0, gap: 10, paddingVertical: 10 }}>
            {data.map(value => {
                return (
                    <View key={value.code} style={[styles.item, { backgroundColor: value.backColor }]}>
                        <MaterialIcons name={value.icon as any} size={50} color="#fff" />
                        <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>{value.total}</Text>
                        <Text style={{ fontWeight: "600", color: "#fff" }}>{value.label}</Text>
                    </View>
                )
            })}
        </VcCadView>
    );
}
export default HomeSticky;