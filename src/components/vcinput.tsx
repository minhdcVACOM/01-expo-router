import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 5
    },
    title: {
        marginLeft: 10,
        position: "relative",
        top: 10,
        zIndex: 1,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        color: "#fff"
    },
    error: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 10,
        fontStyle: "italic"
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        flex: 1
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
    value?: any,
    setValue?: (v: any) => void
}
const VcInput = (progs: IProgs) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isShowPass, setIsShowPass] = useState<boolean>(false);
    const { label, textError, placeholder, keyboardType, secureTextEntry, value, setValue } = progs;
    const color = textError ? (isFocus ? APP_COLOR.BG_DARKORANGE : APP_COLOR.BG_ORANGE) : (isFocus ? APP_COLOR.PRIMARY1 : APP_COLOR.PRIMARY2);
    const _setValue = (v: any) => {
        if (setValue) setValue(v);
    }
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.title, { backgroundColor: color }]}>{label} {textError && <Text style={styles.error}>{"(" + textError + ")"}</Text>}</Text>}
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={[styles.input, { borderColor: color }]}
                    autoCorrect={false}
                    autoCapitalize="none"
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