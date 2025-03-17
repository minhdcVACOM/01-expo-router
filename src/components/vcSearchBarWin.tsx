import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, StyleProp, ViewStyle } from "react-native";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import VcButtonFlat from "./vcButtonFlat";
import { APP_COLOR } from "@/utils/constant";
import VcVoice from "./vcVoice";

interface IProgs {
    setClicked?: (v: boolean) => void,
    setSearchPhrase?: (v: string) => void,
    colorIcon?: string,
    backgroundColor?: string,
    textColor?: string,
    onPress?: () => void,
    onAdd?: () => void,
    hiddenAdd?: boolean,
    hiddenIconBack?: boolean,
    value?: string,
    style?: StyleProp<ViewStyle>
}
const VcSearchBarWin = (props: IProgs) => {
    const {
        setClicked, setSearchPhrase,
        colorIcon, backgroundColor, textColor,
        onPress, onAdd, hiddenAdd, hiddenIconBack, value, style
    } = props;

    const [txtSearch, setTxtSearch] = useState<string>(value ?? "");
    const router = useRouter();

    return (
        <View style={[styles.searchBar, { backgroundColor: backgroundColor || "#fff" }, style]}>
            {!hiddenIconBack && <VcButtonFlat
                type="clear"
                viewStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                onPress={() => {
                    if (onPress)
                        onPress()
                    else
                        router.back();
                }}
                icon={<AntDesign name="arrowleft" size={25} color={APP_COLOR.PRIMARY1} />}
            />}
            <VcVoice onSearch={setTxtSearch} />
            <TextInput
                style={[styles.input, { color: textColor || "#000" }]}
                placeholder="Tìm kiếm"
                value={txtSearch}
                onChangeText={(v) => {
                    setTxtSearch(v);
                    if (setSearchPhrase) setSearchPhrase(v);
                }}
                onFocus={() => {
                    if (setClicked) setClicked(true);
                }}
            />
            {txtSearch && (
                <Entypo name="cross" size={24} color={colorIcon || "gray"} style={{ padding: 1 }} onPress={() => {
                    setTxtSearch("");
                    if (setSearchPhrase) setSearchPhrase("");
                    Keyboard.dismiss();
                }} />
            )}
            {!hiddenAdd && onAdd && <VcButtonFlat
                onPress={onAdd}
                icon={<AntDesign name="plus" size={24} color={APP_COLOR.PRIMARY1} />}
                type="clear"
            />}
        </View>
    );
};

export default VcSearchBarWin;

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-evenly",
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2
    },
    input: {
        flex: 1
    },
});