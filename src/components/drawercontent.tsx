import VcButton from "@/components/vcbutton";
import { APP_COLOR } from "@/utils/constant";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { apiGetLogo } from "@/utils/api";
import empty_logo from "@/assets/images/auth/empty_logo.png";
import VcButtonFlat from "./vcButtonFlat";
import { VcStore } from "@/redux/vcStore";
import { useDispatch, useSelector } from "react-redux";
import { setLogo } from "@/redux/slices/appSlice";
const styles = StyleSheet.create({
    header: {
        backgroundColor: APP_COLOR.BG_DARKRED
    },
    logo: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        gap: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2
    },
    content: {
        flex: 1
    },
    footer: {
        flexDirection: "row",
        borderTopWidth: 0.2,
        borderTopColor: APP_COLOR.BG_DARKRED,
        backgroundColor: APP_COLOR.SECOND2
    }
});
const VcDrawerContent = (props: any) => {
    const { params, navigation } = props;
    const router = useRouter();
    const logo = useSelector((state: VcStore) => state.app.logo)
    const [refresh, setRefresh] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        apiGetLogo((res) => {
            dispatch(setLogo(res.data));
        })
    }, [refresh]);
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[APP_COLOR.BG_DARKRED, APP_COLOR.SECOND2]}
                locations={[0.1, 0.8]}
            >
                <View style={{ borderBottomWidth: 0.2, borderBottomColor: APP_COLOR.BG_DARKRED }}>
                    <View style={styles.logo}>
                        <View style={{ width: 100, height: 100 }}>
                            <Image style={styles.image} source={logo ? { uri: logo } : empty_logo} />
                            <VcButtonFlat
                                onPress={() => setRefresh(!refresh)}
                                pressStyle={{ position: "absolute", bottom: -5, right: -10 }}
                                icon={<Ionicons name="refresh-circle" size={24} color={APP_COLOR.PRIMARY2} />}
                                type="clear"
                            />
                        </View>
                        <VcButton
                            title={params.code}
                            onPress={() => {
                                router.replace({
                                    pathname: "/lstdvcs",
                                    params: params
                                });
                            }}
                            btnStyle={{ backgroundColor: APP_COLOR.BG_DARKRED, borderRadius: 20 }}
                            textStyle={{ color: "#fff" }}
                            pressStyle={{ position: "absolute", right: 10, alignSelf: "center" }}
                        />
                    </View>
                    <Text style={{ fontFamily: "600", fontSize: 20, textAlign: "center" }}>{params.username}</Text>
                </View>
            </LinearGradient>
            <View style={styles.content}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
            <DrawerItem
                label="TestScreen"
                onPress={() => {
                    router.navigate({ pathname: "/testScreen", params: params });
                }}
                icon={({ size, color }) => (<Ionicons name="extension-puzzle-sharp" size={size} color={color} />)}
            />
            <View style={styles.footer}>
                <DrawerItem
                    label="Cài đặt"
                    style={{ flex: 1 }}
                    onPress={() => {
                        router.navigate({ pathname: "/setting", params: params });
                        setTimeout(() => { navigation.closeDrawer() }, 500);
                    }}
                    icon={({ size, color }) => (<Ionicons name="settings" size={size} color={color} />)}
                />
                <DrawerItem
                    label="Thoát"
                    style={{ flex: 1 }}
                    onPress={() => router.replace("/start")}
                    icon={({ size, color }) => (<AntDesign name="logout" size={size} color={color} />)}
                />
            </View>
        </View>
    );
}
export default VcDrawerContent;