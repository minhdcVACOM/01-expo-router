import VcButton from "@/components/vcbutton";
import { APP_COLOR } from "@/utils/constant";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
const styles = StyleSheet.create({
    header: {
        backgroundColor: APP_COLOR.PRIMARY2
    },
    logo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 10,
        marginLeft: 110,
        marginTop: 10,
        gap: 10
    },
    content: {
        flex: 1
    },
    footer: {
        flexDirection: "row",
        borderTopWidth: 0.2,
        borderColor: APP_COLOR.PRIMARY2,
    }
});
const VcDrawerContent = (props: any) => {
    const { params, navigation } = props;
    const router = useRouter();
    const [logo, setLogo] = useState<string>("http://crm.vacom.vn/Content/imgs/userprofile.png");
    useEffect(() => {

    }, []);
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[APP_COLOR.PRIMARY2, 'transparent']}
                locations={[0.2, 0.8]}
            >
                <View style={{ borderBottomWidth: 0.2, borderBottomColor: APP_COLOR.PRIMARY2 }}>
                    <View style={styles.logo}>
                        <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={{ uri: logo }} />
                        <VcButton
                            title={params.code}
                            onPress={() => {
                                router.replace({
                                    pathname: "/lstdvcs",
                                    params: params
                                });
                            }}
                            btnStyle={{ backgroundColor: APP_COLOR.SECOND2 }}
                            textStyle={{ color: "#000" }}
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