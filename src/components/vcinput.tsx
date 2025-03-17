import { APP_COLOR } from "@/utils/constant";
import { ReactNode, useState } from "react";
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ViewStyle } from "react-native";

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
    icon?: ReactNode,
    disable?: boolean,
    textError?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    autoFocus?: boolean,
    value?: any,
    onChangeText?: any,
    onBlur?: (e: any) => void,
    containerStyle?: StyleProp<ViewStyle>,
    multiline?: boolean
}
const VcInput = (progs: IProgs) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isShowPass, setIsShowPass] = useState<boolean>(false);
    const { label, icon, disable, textError, placeholder,
        keyboardType, secureTextEntry, autoCapitalize, autoFocus, value,
        onChangeText, onBlur, containerStyle, multiline } = progs;
    const color = disable ? APP_COLOR.INPUT.DISABLE[0] : textError ? (isFocus ? APP_COLOR.INPUT.FOCUS_ERROR[0] : APP_COLOR.INPUT.ERROR[0]) : (isFocus ? APP_COLOR.INPUT.FOCUS[0] : APP_COLOR.INPUT.BASE[0]);
    const colorText = disable ? APP_COLOR.INPUT.DISABLE[1] : textError ? (isFocus ? APP_COLOR.INPUT.FOCUS_ERROR[1] : APP_COLOR.INPUT.ERROR[1]) : (isFocus ? APP_COLOR.INPUT.FOCUS[1] : APP_COLOR.INPUT.BASE[1]);
    const HeightMultiline = multiline ? { height: 80, textAlignVertical: "top" } : {};
    const _setValue = (v: any) => {
        if (onChangeText) onChangeText(v);
    }
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.title, { backgroundColor: color, color: colorText }]}>{label} {textError && <Text style={[styles.error, { color: colorText }]}>{"(" + textError + ")"}</Text>}</Text>}
            <View style={[styles.content, { borderColor: color, backgroundColor: disable ? APP_COLOR.GRAYLIGHT : "#fff" }]}>
                {icon}
                <TextInput
                    onFocus={() => setIsFocus(true)}
                    onBlur={(e) => {
                        setIsFocus(false);
                        if (onBlur) onBlur(e);
                    }}
                    editable={!disable}
                    style={[styles.input, HeightMultiline] as any}
                    autoFocus={autoFocus}
                    autoCorrect={false}
                    autoCapitalize={!autoCapitalize ? "none" : autoCapitalize}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !isShowPass}
                    value={value}
                    onChangeText={(v) => _setValue(v)}
                    multiline={multiline}
                />
                {secureTextEntry &&
                    <FontAwesome5
                        style={styles.icon}
                        name={isShowPass ? "eye" : "eye-slash"} size={20}
                        color={APP_COLOR.GRAYDARK}
                        onPress={() => setIsShowPass(!isShowPass)}
                    />}
            </View>
        </View>
    );
}
export default VcInput;