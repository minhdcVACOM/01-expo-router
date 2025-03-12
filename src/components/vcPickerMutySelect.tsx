import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import VcButtonFlat from './vcButtonFlat';
import { APP_COLOR } from '@/utils/constant';
import VcLine from './vcLine';
import VcPressable from './vcPressable';
import { StyleProp } from 'react-native';
import VcSearchBar from "@/components/vcSearchBar";
import { ActivityIndicator } from 'react-native';
import { getApiLink } from '@/utils/api';
interface IProg {
    label?: string,
    apiUrl: string,
    fValue?: string,
    fDisplay?: string,
    fShow?: string,
    value?: any,
    onSelect?: (v: any | null) => void,
    containerStyle?: StyleProp<ViewStyle>
}

const VcPickerMutySelect = (progs: IProg) => {
    const { label, apiUrl, fValue, fDisplay, fShow, value, onSelect, containerStyle } = progs;
    const config = { id: fValue ?? "id", value: fDisplay ?? "value", show: fShow ?? "value" };
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [texFilter, setTextFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [filterSelect, setFilterSelect] = useState(false);

    const toggleItemSelection = (item: any) => {
        if (selectedItems.find(selectedItem => selectedItem[config.id] === item[config.id])) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem[config.id] !== item[config.id]));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const removeItem = (item: any) => {
        setSelectedItems(selectedItems.filter(selectedItem => selectedItem[config.id] !== item[config.id]));
    };

    // Xử lý tìm kiếm
    const handleSearch = (text: string, checkFilter: boolean) => {
        setTextFilter(text);
        setFilterSelect(checkFilter);
        const filtered = data.filter((item: any) =>
            item[config.value].toLowerCase().includes(text.toLowerCase()) && (!checkFilter || selectedItems.find(selectedItem => selectedItem[config.id] === item[config.id]))
        );
        setItems(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Gọi API lấy dữ liệu
    const fetchData = async () => {
        getApiLink(apiUrl, (res) => {
            setData(res);
            setItems(res);
        }, setLoading)
    };
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.title, { backgroundColor: APP_COLOR.PRIMARY1 }]}>{label}</Text>}
            <View style={styles.box}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                    style={{
                        borderRightWidth: 0.5,
                        borderRightColor: APP_COLOR.PRIMARY1,
                        paddingTop: 10
                    }}
                >
                    {selectedItems.map(item => (
                        <View key={item[config.id]} style={styles.selectedItem}>
                            <Text>{item[config.value]}</Text>
                            <AntDesign name="close" size={20} color="red" onPress={() => removeItem(item)} />
                        </View>
                    ))}
                </ScrollView>
                <VcButtonFlat type='clear' viewStyle={{ backgroundColor: "transparent", borderWidth: 0 }} icon={<FontAwesome6 name="list-check" size={24} color={APP_COLOR.BG_ORANGE} />} onPress={() => setModalVisible(true)} />
            </View>


            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    {/* Ô tìm kiếm */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <VcSearchBar
                            setSearchPhrase={(text) => handleSearch(text, filterSelect)}
                            value={texFilter}
                            style={{ flex: 1 }}
                        />
                        <VcButtonFlat type='clear' viewStyle={{ backgroundColor: "transparent", borderWidth: 0 }} icon={
                            <MaterialIcons name={
                                filterSelect ? "check-box" : "check-box-outline-blank"
                            } size={24} color={filterSelect ? "green" : "gray"} />
                        } onPress={() => handleSearch(texFilter, !filterSelect)} />
                    </View>
                    {/* Danh sách lựa chọn */}
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator size="large" color={APP_COLOR.PRIMARY2} />
                        </View>
                    ) : (
                        <FlatList
                            data={items}
                            keyExtractor={(item: any) => item[config.id].toString()}
                            renderItem={({ item }: any) => {
                                const isSelect = selectedItems.find(selectedItem => selectedItem[config.id] === item[config.id]);
                                return (
                                    <VcPressable onPress={() => toggleItemSelection(item)} pressStyle={{ flexDirection: "row" }}>
                                        <Text style={{ flex: 1 }}>{item[config.value]}</Text>
                                        <MaterialIcons name={
                                            isSelect ? "check-box" : "check-box-outline-blank"
                                        } size={24} color={isSelect ? "green" : "gray"} />
                                    </VcPressable>
                                )
                            }}
                            ItemSeparatorComponent={() => <VcLine />}
                        />)}
                    <VcButtonFlat type="clear" icon={<AntDesign name="close" size={24} color="red" />} onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY1,
    },
    box: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    openButton: {
        padding: 10,
        backgroundColor: '#ddd',
        marginBottom: 20,
        borderRadius: 10
    },
    selectedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: APP_COLOR.MEDIUM
    },
    modalContainer: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    selected: {
        backgroundColor: '#cce5ff',
    },
    title: {
        marginLeft: 10,
        position: "absolute",
        top: -10,
        zIndex: 1,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        color: "#fff"
    },
});

export default VcPickerMutySelect;