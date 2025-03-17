import { APP_COLOR } from '@/utils/constant';
import { Helper } from '@/utils/helper';
import { AntDesign } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
<AntDesign name="close" size={24} color="black" />
import { Pressable, StyleSheet, Text, View } from 'react-native';
const styles = StyleSheet.create({
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
    container: {
        width: 130
    },
    content: {
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: APP_COLOR.PRIMARY1,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 5,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "space-between"
    }
})
interface IProgs {
    label?: string,
    setValue: (v: any | null) => void,
    value: any | null
}
const VcDatePicker = (progs: IProgs) => {
    const { label, value, setValue } = progs;
    const color = APP_COLOR.INPUT.BASE[0];
    const colorText = APP_COLOR.INPUT.BASE[1];
    return (
        <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => {
                DateTimePickerAndroid.open({
                    value: value ? new Date(value) : new Date(),
                    onChange: (event, newDate) => {
                        if (newDate) setValue(Helper.dateToString(newDate, "yyyy-MM-dd"));
                    },
                    mode: "date",
                });
            }}>
            <View style={[styles.container]}>
                {label && <Text style={[styles.title, { backgroundColor: color, color: colorText }]}>{label}</Text>}
                <View style={styles.content}>
                    <Text>{Helper.formatDate(value)}</Text>
                    {value ? <AntDesign name="close" size={20} color={APP_COLOR.BG_ORANGE} onPress={() => setValue("")} /> : <AntDesign name="calendar" size={20} color={color} />}
                </View>
            </View>
        </Pressable>
    );
}
export default VcDatePicker;