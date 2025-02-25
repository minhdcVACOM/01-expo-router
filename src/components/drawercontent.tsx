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
    const [logo, setLogo] = useState<string>();
    useEffect(() => {
        apiGetLogo((res) => {
            setLogo(res.data);
        })
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[APP_COLOR.BG_DARKRED, APP_COLOR.SECOND2]}
                locations={[0.1, 0.8]}
            >
                <View style={{ borderBottomWidth: 0.2, borderBottomColor: APP_COLOR.BG_DARKRED }}>
                    <View style={styles.logo}>
                        <Image style={styles.image} source={{ uri: logo }} />
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
            <View style={styles.footer}>
                <DrawerItem
                    label="Cài đặt"
                    style={{ flex: 1 }}
                    onPress={() => {
                        router.navigate("/setting");
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