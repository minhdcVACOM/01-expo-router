import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
    Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { APP_COLOR } from "@/utils/constant";

type OptionItem = {
    value: string;
    label: string;
};

interface DropDownProps {
    title?: string;
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
    defaultValue?: OptionItem;
    textError?: string;
    addTop?: number;
}

const VcDropdown = ({
    title,
    data,
    onChange,
    placeholder,
    defaultValue,
    textError,
    addTop
}: DropDownProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

    const [value, setValue] = useState<OptionItem>();

    const buttonRef = useRef<View>(null);

    const [top, setTop] = useState(0);
    useEffect(() => {
        if (defaultValue) setValue(defaultValue);
    }, [])
    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item);
        setExpanded(false);
    }, []);
    const color = textError ? APP_COLOR.BG_ORANGE : APP_COLOR.BG_DARKRED;
    return (
        <View
            ref={buttonRef}
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const topOffset = layout.y;
                const heightOfComponent = layout.height;
                const finalValue = topOffset + heightOfComponent - 1 + (addTop ? addTop : 0);
                setTop(finalValue);
            }}
            style={{ marginHorizontal: 20, marginVertical: 0 }}
        >
            {title && <Text style={[styles.title, { backgroundColor: color }]}>{title} {textError && <Text style={styles.error}>{"(" + textError + ")"}</Text>}</Text>}
            <TouchableOpacity
                style={[styles.button, { borderColor: color }]}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <Text style={styles.text}>{value?.label || placeholder}</Text>
                <AntDesign name={expanded ? "caretup" : "caretdown"} color={color} />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View style={styles.backdrop}>
                            <View
                                style={[
                                    styles.options,
                                    {
                                        top,
                                    },
                                ]}
                            >
                                {/* {title && <Text style={{ flex: 1, paddingVertical: 5, textAlign: "center", fontWeight: "600", borderBottomWidth: 1, borderBottomColor: APP_COLOR.PRIMARY2 }}>{title}</Text>} */}
                                <FlatList
                                    style={{ backgroundColor: "#fff", paddingLeft: 10 }}
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text style={[styles.optionItem,
                                            { color: item.value === value?.value ? APP_COLOR.BG_DARKORANGE : APP_COLOR.PRIMARY1, fontWeight: item.value === value?.value ? "600" : "400" }
                                            ]}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}
export default VcDropdown;

const styles = StyleSheet.create({
    backdrop: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    optionItem: {
        padding: 5,
        justifyContent: "center",
    },
    separator: {
        height: 4,
    },
    options: {
        position: "absolute",
        // top: 53,
        backgroundColor: APP_COLOR.SECOND2,
        width: "100%",
        // padding: 10,
        borderRadius: 6,
        maxHeight: 250,
        borderWidth: 0.2,
        borderColor: APP_COLOR.BG_DARKORANGE,
    },
    text: {
        fontSize: 15,
        opacity: 0.8
    },
    button: {
        height: 45,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 6,
        borderWidth: 0.2,
        borderColor: APP_COLOR.BG_DARKORANGE
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
});