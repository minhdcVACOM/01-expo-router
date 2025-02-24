import { APP_COLOR } from "@/utils/constant";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, BackHandler, FlatList, Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from "react";
import BackGroundScreen from "@/components/backgroundscreen";

interface IDvcs {
    code: string;
    name: string;
    address: string;
    taxCode: string;
}
const styles = StyleSheet.create({
    title: {
        fontWeight: "600",
        marginBottom: 20,
        fontSize: 20
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
    useEffect(() => {
        const backAction = () => {
            // Alert.alert('Thông báo!', 'Bạn có muốn quay lại màn hình Đăng nhập không?', [
            //     {
            //         text: 'Không',
            //         onPress: () => null,
            //         style: 'cancel',
            //     },
            //     // {text: 'YES', onPress: () => BackHandler.exitApp()},
            //     { text: 'Có', onPress: () => router.replace("/start") },
            // ]);
            router.replace("/start");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    const data: IDvcs[] = [
        {
            code: "VP",
            name: "Công ty cổ phần VACOM",
            address: "Tầng 4, Tòa nhà Đa Năng, 169 Nguyễn Ngọc Vũ, Cầu Giấy, Hà Nội",
            taxCode: "0102236276"
        },
        // {
        //     code: "VAT",
        //     name: "Công ty M-INVOICE",
        //     address: "Tòa nhà M-invoice Kim Đồng",
        //     taxCode: "0123456789"
        // }
    ];

    const pressItem = (item: IDvcs) => {
        const param = Object.assign(res, { code: item.code });
        router.replace({
            pathname: "/(drawer)",
            params: param
        });
    }
    return (
        <BackGroundScreen>
            <View style={{ flex: 1, margin: 20 }}>
                <Text style={styles.title}>DANH SÁCH ĐƠN VỊ</Text>
                <FlatList
                    data={data}
                    renderItem={({ item, index, separators }) => ItemView(item, res.code, pressItem)}
                />
            </View>
        </BackGroundScreen>
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