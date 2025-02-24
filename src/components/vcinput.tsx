import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 0
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
        borderWidth: 0.2,
        borderRadius: 6,
        flex: 1,
        backgroundColor: "#fff"
    },
    icon: {
        position: "absolute",
        right: 10,
        top: 10
    }
});
interface IProgs {
    label?: string,
    textError?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    autoFocus?: boolean,
    value?: any,
    onChangeText?: any,
    onBlur?: () => void
}
const VcInput = (progs: IProgs) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isShowPass, setIsShowPass] = useState<boolean>(false);
    const { label, textError, placeholder,
        keyboardType, secureTextEntry, autoCapitalize, autoFocus, value,
        onChangeText, onBlur } = progs;
    const color = textError ? (isFocus ? APP_COLOR.BG_DARKORANGE : APP_COLOR.BG_ORANGE) : (isFocus ? APP_COLOR.BG_DARKORANGE : APP_COLOR.BG_DARKRED);
    const _setValue = (v: any) => {
        if (onChangeText) onChangeText(v);
    }
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.title, { backgroundColor: color }]}>{label} {textError && <Text style={styles.error}>{"(" + textError + ")"}</Text>}</Text>}
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => {
                        setIsFocus(false);
                        if (onBlur) onBlur();
                    }}
                    style={[styles.input, { borderColor: color }]}
                    autoFocus={autoFocus}
                    autoCorrect={false}
                    autoCapitalize={!autoCapitalize ? "none" : autoCapitalize}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !isShowPass}
                    value={value}
                    onChangeText={(v) => _setValue(v)}
                />
                {secureTextEntry &&
                    <FontAwesome5
                        style={styles.icon}
                        name={isShowPass ? "eye" : "eye-slash"} size={20}
                        color={color}
                        onPress={() => setIsShowPass(!isShowPass)}
                    />}
            </View>
        </View>
    );
}
export default VcInput;