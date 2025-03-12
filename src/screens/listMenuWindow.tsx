import { TextHeader } from "@/components/textHeader";
import { APP_COLOR } from "@/utils/constant";
import { DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { SectionList, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator } from "react-native";
import { postApiLink } from "@/utils/api";
import { API_LINK } from "@/utils/apiLink";
import { useRouter } from "expo-router";
import VcButtonFlat from "@/components/vcButtonFlat";
import { useDispatch, useSelector } from "react-redux";
import { VcStore } from "@/redux/vcStore";
import { setRefresh } from "@/redux/slices/appSlice";
interface IProgs {
    title: string,
    data: any,
    icon?: React.ReactNode
}
const ListMenuWindow = (progs: IProgs) => {
    const { title, data, icon } = progs;
    const dispatch = useDispatch();
    return (
        <View style={{
            marginHorizontal: 10
        }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextHeader title={title} textStyle={{ flex: 1 }} />
                <VcButtonFlat type="clear" onPress={() => dispatch(setRefresh())} icon={<MaterialIcons name="refresh" size={30} color="black" />} />
            </View>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item.windowId}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title } }) => renderSectionHeader(title, icon)}
                ItemSeparatorComponent={(progs) => separator(progs)}
            />
        </View>
    );
}
const separator = (progs: any) => {
    return (<View style={{ borderBottomColor: APP_COLOR.GRAY, borderBottomWidth: 1, marginLeft: 10 }}></View>);
}
const renderSectionHeader = (title: string, icon?: React.ReactNode) => {
    return (
        <View style={styles.header}>
            {icon || <AntDesign name="bars" size={24} color="#fff" />}
            <Text style={{ flex: 1, fontSize: 18, color: "#fff" }}>{title}</Text>
        </View>
    );
}
const renderItem = (item: IMenuWindow) => {
    const refresh = useSelector((state: VcStore) => state.app.refresh);
    const styleAdd: StyleProp<ViewStyle> = !item.marginBottom ? {} :
        {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        };
    const [numRow, setNumRow] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        const paramAdd = { menuId: item.menuId, windowId: item.windowId };
        const config = {
            headers: {
                "X-Menu": item.menuId,
            }
        }
        postApiLink(API_LINK.WINDOW.POST_GET, { ...API_LINK.WINDOW.PARAM, ...paramAdd }, (res) => {
            setNumRow(res.total_count);
        }, setLoading, config)
    }, [refresh])
    return (
        <View style={{ flexDirection: "row", marginBottom: item.marginBottom ?? 0 }}>
            <DrawerItem
                icon={({ size, color }) => (<AntDesign name="arrowright" size={size} color={color} />)}
                style={[styles.item, styleAdd]}
                label={item.title}
                onPress={() => {
                    router.navigate({
                        pathname: "/windowView",
                        params: {
                            title: item.title,
                            menuId: item.menuId,
                            windowId: item.windowId,
                            numRow: numRow
                        }
                    })
                }}
            />
            <View style={styles.right}>
                {loading ? <ActivityIndicator style={{}} size={"large"} color={APP_COLOR.PRIMARY2} /> :
                    <Text style={[styles.textRight, { opacity: numRow ? 1 : 0 }]}>{numRow}</Text>
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    textRight: {
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2,
        backgroundColor: APP_COLOR.SECOND2,
        borderRadius: 20,
        padding: 5,
        color: "#000"
    },
    right: {
        position: "absolute",
        right: 5,
        alignSelf: "center",
        zIndex: 1
    },
    item: {
        flex: 1,
        marginLeft: 10,
        borderColor: APP_COLOR.PRIMARY2,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 0
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: APP_COLOR.PRIMARY1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        gap: 5
    }
});
export default ListMenuWindow;