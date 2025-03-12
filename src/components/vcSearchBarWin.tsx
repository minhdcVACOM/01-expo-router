import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import VcButtonFlat from "./vcButtonFlat";
import { APP_COLOR } from "@/utils/constant";

interface IProgs {
    setClicked?: (v: boolean) => void,
    setSearchPhrase?: (v: string) => void,
    colorIcon?: string,
    backgroundColor?: string,
    textColor?: string,
    onPress?: () => void,
    onAdd?: () => void,
    hiddenIconBack?: boolean,
    value?: string
}
const VcSearchBarWin = (props: IProgs) => {
    const {
        setClicked, setSearchPhrase,
        colorIcon, backgroundColor, textColor,
        onPress, onAdd, hiddenIconBack, value
    } = props;
    const [txtSearch, setTxtSearch] = useState<string>(value ?? "");
    const router = useRouter();
    return (
        <View style={[styles.searchBar, { backgroundColor: backgroundColor || "#fff" }]}>
            {!hiddenIconBack && <VcButtonFlat
                onPress={() => {
                    if (onPress)
                        onPress()
                    else
                        router.back();
                }}
                icon={<AntDesign name="arrowleft" size={25} color="black" />}
            />}
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
            {onAdd && <VcButtonFlat
                onPress={onAdd}
                icon={<AntDesign name="plus" size={24} color={APP_COLOR.BLUE} />}
                type="clear"
            />}
        </View>
    );
};

export default VcSearchBarWin;

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingRight: 10,
        gap: 5,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2
    },
    input: {
        flex: 1
    },
});