import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
interface IProgs {
    decimalSeparator?: string,
    thousandSeparator?: string,
    decimalPlaces?: number,
    number?: number,
    setNumber?: (num: number | null) => void,
    label?: string,
    disable?: boolean,
    textError?: string,
    onBlur?: (e: any) => void,
    placeholder?: string
}
const NumberInput = ({
    decimalSeparator = ".",
    thousandSeparator = " ",
    decimalPlaces = 2,
    number,
    setNumber,
    label, disable, textError, onBlur, placeholder
}: IProgs) => {
    const [value, setValue] = useState(number ? number + "" : "");
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const handleChange = (text: any) => {
        const formatted = Helper.formatNumber(text, ".", " ", 0);
        setValue(formatted ?? "");
        if (setNumber) setNumber(convertToNumber(formatted ?? ""))
    };
    const convertToNumber = (text: string) => {
        const sNum = text.replace(/ /g, "");
        return sNum ? parseFloat(sNum) : null;
    }
    const color = disable ? APP_COLOR.GRAYDARK : textError ? (isFocus ? APP_COLOR.BG_DARKORANGE : APP_COLOR.BG_ORANGE) : (isFocus ? APP_COLOR.BG_DARKRED : APP_COLOR.PRIMARY1);
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.title, { backgroundColor: color }]}>{label} {textError && <Text style={styles.error}>{"(" + textError + ")"}</Text>}</Text>}
            <View style={[styles.content, { borderColor: color, backgroundColor: disable ? APP_COLOR.GRAYLIGHT : "#fff" }]}>
                <TextInput
                    onFocus={() => setIsFocus(true)}
                    onBlur={(e) => {
                        setIsFocus(false);
                        if (onBlur) onBlur(e);
                    }}
                    style={styles.input}
                    value={value}
                    keyboardType="numeric"
                    onChangeText={handleChange}
                    placeholder={placeholder ?? "Nhập số"}
                    editable={!disable}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    content: {
        borderWidth: 0.5,
        borderRadius: 6,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 5
    },
    title: {
        marginLeft: 10,
        position: "relative",
        top: 10,
        zIndex: 1,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        color: "#fff"
    },
    error: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 10,
        fontStyle: "italic"
    },
    input: {
        paddingTop: 10,
        flex: 1,
        textAlign: "right"
    },
});

export default NumberInput;
