import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { APP_COLOR } from "@/utils/constant";

interface CheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    align?: "left" | "right";
    style?: { colorIcon: { checked: string, unChecked: string }, colorText: string }
}

const VcCheckBox = ({ label, checked, onChange, align, style }: CheckBoxProps) => {
    const iconColor = checked ?
        (!style ? APP_COLOR.INPUT.FOCUS[0] : style.colorIcon.checked) :
        (!style ? "gray" : style.colorIcon.unChecked);
    const textColor = !style ? "#000" : style.colorText;
    return (
        <TouchableOpacity style={styles.container} onPress={() => onChange(!checked)}>
            {(!align || align === "left") && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
            <MaterialIcons name={checked ? "check-box" : "check-box-outline-blank"} size={24} color={iconColor} />
            {(align === "right") && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        gap: 10
    },
    label: {
        fontWeight: "600"
    },
});

export default VcCheckBox;