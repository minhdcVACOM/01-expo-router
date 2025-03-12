import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { APP_COLOR } from "@/utils/constant";
import LoadingOverlay from "./overlay";
import { DrawerItem } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import VcButtonFlat from "./vcButtonFlat";
const styles = StyleSheet.create({
    btnContainer: {
        borderColor: APP_COLOR.MEDIUM,
        backgroundColor: APP_COLOR.BG_DARKRED,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    btnText: {
        color: APP_COLOR.PRIMARY_TEXT
    }
});
interface IProgs {
    onPress?: () => void
}
const VcBackButton = (progs: IProgs) => {
    const { onPress } = progs;
    const router = useRouter();
    return (
        <VcButtonFlat
            pressStyle={{ position: "absolute", top: 5, left: 5, width: 60, zIndex: 10 }}
            onPress={() => {
                if (onPress)
                    onPress()
                else
                    router.back();
            }}
            icon={<AntDesign name="arrowleft" size={25} color="black" />}
        />
        // <DrawerItem
        //     label=""
        //     style={{ position: "absolute", top: 5, left: 5, width: 60 }}
        //     onPress={() => {
        //         if (onPress)
        //             onPress()
        //         else
        //             router.back();
        //     }}
        //     icon={() => (<AntDesign name="arrowleft" size={25} color="black" />)}
        //     labelStyle={{ width: 0 }}
        // />
    );
}

export default VcBackButton;