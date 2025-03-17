import { APP_COLOR, APP_KEY } from "@/utils/constant";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BackHandler, FlatList, RefreshControl, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { apiDvcs } from "@/utils/api";
import VcSearchBar from "@/components/vcSearchBar";
import VcBackButton from "@/components/vcBackButton";
import React from "react";
import { TextHeader } from "@/components/textHeader";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDvcs } from "@/redux/slices/appSlice";

const styles = StyleSheet.create({
    title: {
        fontWeight: "600",
        marginTop: 20,
        fontSize: 20,
        alignSelf: "center"
    },
    itemLayout: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 0.2,
        borderColor: APP_COLOR.PRIMARY2,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    pressView: {
        flex: 1,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        marginBottom: 10
    },
    itemContainer: {
        // flex: 1,
        // padding: 10,
        // backgroundColor: "#fff",
        // borderWidth: 0.5,
        // borderColor: APP_COLOR.PRIMARY2,
        // borderBottomLeftRadius: 6,
        // borderTopLeftRadius: 6,
        // borderBottomRightRadius: 50,
        // borderTopRightRadius: 50
    },
    itemTitle: {
        fontWeight: "600",
        color: APP_COLOR.PRIMARY2
    },
    itemDetail: {
        fontStyle: "italic",
        fontSize: 12,
        color: APP_COLOR.MEDIUM,
        marginLeft: 10
    }
});
const LstDvcs = () => {
    const res: any = useLocalSearchParams();
    const router = useRouter();
    const [data, setData] = useState<IDvcs[]>([]);
    const [txtSearch, setTxtSearch] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(true);
    const dispatch = useDispatch();
    useEffect(() => {
        // get Data
        getData();
        //
        const backAction = () => {
            router.replace("/start");
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);
    const getData = () => {
        setData([]);
        setRefresh(true);
        apiDvcs((res) => {
            setData(res);
            setRefresh(false);
        })
    }
    const pressItem = (item: IDvcs) => {
        const _run = async () => {
            await AsyncStorage.setItem(APP_KEY.DVCS_ID, item.id)
            const param = Object.assign(res, { code: item.code });
            dispatch(setDvcs(item));
            router.replace({
                pathname: "/(drawer)",
                params: param
            });
        }
        _run();
    }

    return (
        <>
            <VcBackButton onPress={() => router.replace("/start")} />
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <TextHeader title="DANH SÁCH ĐƠN VỊ" />
                <VcSearchBar
                    setSearchPhrase={setTxtSearch}
                />
                <FlatList
                    data={data}
                    renderItem={
                        ({ item, index, separators }) => {
                            if (item.name.toUpperCase().includes(txtSearch.toUpperCase().trim().replace(/\s/g, ""))) {
                                return ItemView(item, res.code, pressItem)
                            } else {
                                return null;
                            }
                        }
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => getData()}
                            colors={[APP_COLOR.BG_DARKRED]}
                        />
                    }
                />
            </View>
        </>
    );
}
const ItemView = (item: IDvcs, code: string, pressItem: (item: IDvcs) => void) => {
    const styleCurrent = (code && code === item.code) ? { borderLeftWidth: 6, borderLeftColor: APP_COLOR.PRIMARY2, backgroundColor: APP_COLOR.SECOND2 } : {};
    return (
        <TouchableHighlight
            key={item.code}
            onPress={() => pressItem(item)}
            style={styles.pressView}
        >
            <View style={[styles.itemLayout, styleCurrent]}>
                <View>
                    <Text style={styles.itemTitle}>{item.code} - {item.taxCode}</Text>
                    <Text>{item.name}</Text>
                    <Text style={styles.itemDetail}>{item.name}</Text>
                </View>
                <AntDesign name="arrowright" size={30} color={APP_COLOR.PRIMARY2} />
            </View>
        </TouchableHighlight>
    );
}
export default LstDvcs;