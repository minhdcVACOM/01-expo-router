import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
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
    placeholder?: string,
    style?: StyleProp<ViewStyle>
}
const NumberInput = ({
    decimalSeparator = ".",
    thousandSeparator = " ",
    decimalPlaces = 2,
    number,
    setNumber,
    label, disable, textError, onBlur, placeholder, style
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
    const color = disable ? APP_COLOR.INPUT.DISABLE[0] : textError ? (isFocus ? APP_COLOR.INPUT.FOCUS_ERROR[0] : APP_COLOR.INPUT.ERROR[0]) : (isFocus ? APP_COLOR.INPUT.FOCUS[0] : APP_COLOR.INPUT.BASE[0]);
    const colorText = disable ? APP_COLOR.INPUT.DISABLE[1] : textError ? (isFocus ? APP_COLOR.INPUT.FOCUS_ERROR[1] : APP_COLOR.INPUT.ERROR[1]) : (isFocus ? APP_COLOR.INPUT.FOCUS[1] : APP_COLOR.INPUT.BASE[1]);
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={[styles.title, { backgroundColor: color, color: colorText }]}>{label} {textError && <Text style={[styles.error, { color: colorText }]}>{"(" + textError + ")"}</Text>}</Text>}
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
