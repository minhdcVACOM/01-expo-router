import { StyleSheet, Text, View } from "react-native";
import CheckBox from '@react-native-community/checkbox';
interface IProg {
    label?: string,
    value?: boolean,
    onValueChange?: (v: boolean) => void,
    display?: "left" | "right"
}
const VcCheckBox = (prog: IProg) => {
    const { label, value, onValueChange, display } = prog;
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                {display === "left" && <Text style={styles.label}>{label}</Text>}
                <CheckBox
                    value={value}
                    onValueChange={onValueChange}
                    style={styles.checkbox}
                />
                {(!display || display === "right") && <Text style={styles.label}>{label}</Text>}
            </View>
        </View>
    );
}
export default VcCheckBox;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        alignSelf: 'center'
    },
    label: {
        marginHorizontal: 10
    },
});