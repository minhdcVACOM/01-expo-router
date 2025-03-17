import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import VcSearchBarWin from "@/components/vcSearchBarWin";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { APP_COLOR } from "@/utils/constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import { deleteApiLink, getApiLink, postApiLink, putApiLink } from "@/utils/api";
import { API_LINK } from "@/utils/apiLink";
import { Modal } from "react-native";
import VcButtonFlat from "@/components/vcButtonFlat";
import { ActivityIndicator } from "react-native";
import LoadingOverlay from "@/components/overlay";
import { showSweetAlert } from "@/components/sweetalert";
import ItemWindow from "./itemWindow";
import ModalWindow from "./modalWindow";
import VcCadView from "@/components/vcCardView";
import debounce from "debounce";
import VcPicker from "@/components/vcPicker";
import { MaterialIcons } from "@expo/vector-icons";
import VcMenu from "@/components/vcMenu";
import { MenuProvider } from "react-native-popup-menu";
const ActionMenu = {
    DELETE: "delete",
    EDIT: "edit",
    PRINT: "print"
}
interface IMenu {
    id?: string,
    value?: string,
    icon?: ReactNode
}
const WindowData = (progs: IMenuWindow) => {
    const { menuId, title, windowId, quickSearch, fieldSearch, status } = progs;

    const oStatus = (typeof status === "string" ? JSON.parse(status) : null);

    const [data, setData] = useState<any[]>([]);
    const [infoPage, setInfoPage] = useState({
        page: 1,
        totalPage: 1,
        count: API_LINK.WINDOW.PARAM.count,
        numRow: 0,
        isLoading: false,
        isRefresh: false
    });
    const [winConfig, setWinConfig] = useState<{ permissions: IPermissionsWindow, voucherTemplates: IVoucherTemplate[] }>();
    const [dataMenu, setDataMenu] = useState<IMenu[]>([]);
    const [runApi, setRunApi] = useState(false);
    const [itemSelect, setItemSelect] = useState<any | null>();
    const [modalVisible, setModalVisible] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    const [statusId, setStatusId] = useState("");
    const handTextSearch = debounce(async (text: string, valueStatus?: string) => {
        setTextSearch(text);
        if (valueStatus) setStatusId(valueStatus);
        if (quickSearch || fieldSearch || oStatus) {
            getData(1, () => { }, text, valueStatus);
        }
    }, 500)
    const selectItem = (item: any, id?: number | string) => {
        setItemSelect(item);
        switch (id) {
            case ActionMenu.DELETE:
                onDelete(item);
                break;
            case ActionMenu.EDIT:
                if (winConfig?.permissions.mnEdit) setModalVisible(true);
                break;
            case ActionMenu.PRINT:
                onPrint();
                break;
            default:
                break;
        }
    }

    const getData = (pageNumber: number, callBack?: () => void, searchText?: string, valueStatus?: string) => {
        let _updateInfoPage: any = { isLoading: true, page: pageNumber, isRefresh: pageNumber === 1 };
        setInfoPage({ ...infoPage, ..._updateInfoPage });
        const txtSearch = searchText ?? textSearch;
        let filterRows = [];
        if (fieldSearch) filterRows.push({ columnName: fieldSearch, columnType: "string", value: txtSearch });
        if (oStatus) filterRows.push({ columnName: oStatus.fieldName, columnType: oStatus.fieldType, value: valueStatus ?? statusId });
        const paramAdd = {
            menuId: menuId,
            windowId: windowId,
            start: (pageNumber - 1) * infoPage.count,
            count: infoPage.count,
            quickSearch: quickSearch ? txtSearch : "",
            filterRows: filterRows
        };
        const config = {
            headers: {
                "X-Menu": menuId,
            }
        }
        postApiLink(API_LINK.WINDOW.POST_GET, { ...API_LINK.WINDOW.PARAM, ...paramAdd }, (res) => {
            setData(pageNumber === 1 ? res.data : [...data, ...res.data])
            if (pageNumber == 1) {
                const totalPage = Math.floor(res.total_count / infoPage.count) + 1;
                _updateInfoPage.numRow = res.total_count
                _updateInfoPage.totalPage = totalPage
            }
            _updateInfoPage.isLoading = false;
            _updateInfoPage.isRefresh = false
            setInfoPage({ ...infoPage, ..._updateInfoPage });
            if (callBack) callBack();
        }, setRunApi, config)
    }

    useEffect(() => {
        getApiLink(API_LINK.WINDOW.GET_CONFIG + menuId, ({ permissions, voucherTemplates }:
            { permissions: IPermissionsWindow, voucherTemplates: IVoucherTemplate[] }) => {
            setWinConfig({ permissions: permissions, voucherTemplates: voucherTemplates });
            let menu = [];
            if (permissions.mnDelete) menu.push({ id: ActionMenu.DELETE, value: "Xóa", icon: <MaterialIcons name="delete" size={24} color="red" /> });
            if (permissions.mnEdit) menu.push({ id: ActionMenu.EDIT, value: "Sửa", icon: <MaterialIcons name="edit" size={24} color="blue" /> });
            if (voucherTemplates.length > 0) {
                menu.push({});
                menu.push({ id: ActionMenu.PRINT, value: "In", icon: <MaterialIcons name="print" size={24} color="violet" /> });
            }
            setDataMenu(menu);
            getData(infoPage.page);
        }, setRunApi)
        // getData(infoPage.page);
    }, [])

    const onRefresh = () => {
        getData(1);
    };
    const onEndReached = () => {
        if (!infoPage.isLoading && infoPage.page < infoPage.totalPage) {
            getData(infoPage.page + 1);
        }
    };
    const onPrint = () => {
        alert('Print Item ...');
    }
    const onDelete = (itemDel: any) => {
        showSweetAlert({
            text: 'Bạn có muốn xóa không',
            cancelButtonText: "Không",
            confirmButtonText: "Có",
            showCancelButton: true,
            onConfirm: () => {
                const config = {
                    headers: {
                        "X-Menu": menuId,
                    }
                }
                deleteApiLink(API_LINK.WINDOW.DELETE + itemDel.id, config, (res) => {
                    getData(1, () => setModalVisible(false));
                }, setRunApi)
            },
            type: 'question'
        });
    }
    const onSave = (values?: any) => {
        const config = {
            headers: {
                "X-Menu": menuId,
                "X-Window": windowId
            }
        }
        if (values) {
            if (values.id) {
                const linkPut = API_LINK.WINDOW.PUT + itemSelect.id;
                const dataPut = { ...itemSelect, ...values };
                putApiLink(linkPut, dataPut, config, (res) => {
                    // setData((data) => data.map((item) =>
                    //     item.id === values.id ? { ...item, ...values } : item
                    // ))
                    getData(1, () => setModalVisible(false));
                }, setRunApi);
            } else {
                postApiLink(API_LINK.WINDOW.POST, values, (res) => {
                    // setData([res, ...data]);
                    getData(1, () => setModalVisible(false));
                }, setRunApi, config);
            }
        }
    }
    const renderModal = useMemo(() => {
        return <ModalWindow windowId={windowId} item={itemSelect} callBack={onSave} />
    }, [itemSelect]);
    return (
        <View style={{ flex: 1, paddingHorizontal: 10, gap: 5 }}>
            <View style={[styles.header]}>
                <Text style={styles.title}>{title}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 10, alignItems: "center" }}>
                    <Text style={styles.detail}>{data.length}/{infoPage.numRow}</Text>
                    {status && <VcPicker
                        containerStyle={{ width: 130 }}
                        value={statusId}
                        onSelect={(v) => handTextSearch(textSearch, v)}
                        apiUrl={API_LINK.REF.REFERENCE + oStatus.refId}
                        placeholder="Trạng thái..."
                        isColorItem={true}
                    />}
                </View>
            </View>
            <VcSearchBarWin
                value={textSearch}
                setSearchPhrase={handTextSearch}
                onAdd={() => selectItem(null, ActionMenu.EDIT)}
                hiddenAdd={!winConfig?.permissions?.mnPlus}
            />
            <MenuProvider>
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={data}
                    renderItem={({ item }: any) => {
                        return (
                            <PressItem
                                key={item.id}
                                onActionSelect={selectItem}
                                dataMenu={dataMenu}
                                item={item}>
                                <ItemWindow windowId={windowId} item={item} />
                            </PressItem>
                        );
                    }}
                    // ItemSeparatorComponent={(progs) => <VcLine />}
                    refreshControl={
                        <RefreshControl
                            refreshing={infoPage.isRefresh}
                            onRefresh={onRefresh}
                            colors={[APP_COLOR.BG_DARKRED]}
                        />
                    }
                    onEndReachedThreshold={0.1} // Khi cuộn đến 90% màn hình, bắt đầu load thêm
                    onEndReached={onEndReached}
                />
            </MenuProvider>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modal}>
                    <View style={styles.headerModal}>
                        <AntDesign name={itemSelect ? "edit" : "plus"} size={25} color={APP_COLOR.PRIMARY1} />
                        <Text style={{ flex: 1, fontSize: 18, textAlign: "center", color: APP_COLOR.PRIMARY1 }}>{itemSelect ? "Sửa" : "Thêm mới"}</Text>
                        <View style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
                            {runApi ? <ActivityIndicator size='large' color={APP_COLOR.PRIMARY2} /> : <VcButtonFlat type="clear" icon={<AntDesign name="close" size={20} color={APP_COLOR.BG_DARKORANGE} />} onPress={() => setModalVisible(!modalVisible)} />}
                        </View>
                    </View>
                    <VcCadView cardStyle={{ backgroundColor: "#fff", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                        {renderModal}
                    </VcCadView>
                </View>
            </Modal>
            {(modalVisible || runApi) && <LoadingOverlay animating={false} />}
        </View>

    );
}

interface Ipros {
    item: any,
    children?: any,
    onActionSelect: (item: any, id?: number | string) => void,
    dataMenu: IMenu[]
}
const PressItem = React.memo((progs: Ipros) => {
    const { item, children, onActionSelect, dataMenu } = progs;
    return (
        <Pressable
            style={({ pressed }) =>
                ([styles.pressStyle, { opacity: pressed ? 0.8 : 1 }])}
            onPress={() => {
                onActionSelect(item, ActionMenu.EDIT)
            }}
        >
            <View style={styles.containerItem}>
                <View style={{ flex: 1, padding: 10 }}>
                    {children}
                </View>
                {dataMenu.length > 0 && <VcMenu data={dataMenu} onSelect={menuId => onActionSelect(item, menuId)} />}
            </View>
        </Pressable>
    )
})
const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        gap: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
    },
    detail: {
        color: "#fff",
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    modal: {
        height: 'auto',
        marginTop: 'auto',
        backgroundColor: APP_COLOR.GRAYLIGHT,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    headerModal: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    pressStyle: {

    },
    containerItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 2,
    }
})
export default WindowData;