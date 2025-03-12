import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, ViewStyle } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { APP_COLOR } from "@/utils/constant";
import { StyleProp } from "react-native";

interface IProgs {
    setClicked?: (v: boolean) => void,
    setSearchPhrase?: (v: string) => void,
    colorIcon?: string,
    backgroundColor?: string,
    textColor?: string,
    value?: string,
    style?: StyleProp<ViewStyle>
}
const vCSearchBar = (props: IProgs) => {
    const {
        setClicked, setSearchPhrase,
        colorIcon, backgroundColor, textColor, value, style
    } = props;
    const [txtSearch, setTxtSearch] = useState<string>(value ?? "");
    return (
        <View style={[styles.searchBar, { backgroundColor: backgroundColor || "#fff" }, style]}>
            <Feather
                name="search"
                size={24}
                color={colorIcon || "gray"}
                style={{ marginLeft: 1 }}
            />
            <TextInput
                style={[styles.input, { color: textColor || "#000" }]}
                placeholder="Tìm kiếm"
                value={txtSearch}
                onChangeText={(v) => {
                    setTxtSearch(v);
                    if (setSearchPhrase) setSearchPhrase(v);
                }
                }
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
        </View>
    );
};

export default vCSearchBar;

const styles = StyleSheet.create({
    searchBar: {
        paddingHorizontal: 5,
        flexDirection: "row",
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2,
        alignItems: "center",
        // justifyContent: "space-evenly",
        marginVertical: 5
    },
    input: {
        flex: 1
    },
});