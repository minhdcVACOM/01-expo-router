import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import VcSearchBarWin from "@/components/vcSearchBarWin";
import React, { useEffect, useMemo, useState } from "react";
import { APP_COLOR } from "@/utils/constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import { deleteApiLink, postApiLink, putApiLink } from "@/utils/api";
import { API_LINK } from "@/utils/apiLink";
import { Modal } from "react-native";
import VcButtonFlat from "@/components/vcButtonFlat";
import { ActivityIndicator } from "react-native";
import LoadingOverlay from "@/components/overlay";
import { showSweetAlert } from "@/components/sweetalert";
import ItemWindow from "./itemWindow";
import ModalWindow from "./modalWindow";
import VcLine from "@/components/vcLine";
const WindowData = (progs: IMenuWindow) => {

    const { menuId, title, windowId } = progs;

    const [data, setData] = useState<any[]>([]);
    const [infoPage, setInfoPage] = useState({
        page: 1,
        totalPage: 1,
        count: API_LINK.WINDOW.PARAM.count,
        numRow: 0,
        isLoading: false,
        isRefresh: false
    });
    const [runApi, setRunApi] = useState(false);
    const [itemSelect, setItemSelect] = useState<any | null>();
    const [modalVisible, setModalVisible] = useState(false);
    const selectItem = (item: any) => {
        setItemSelect(item);
        setModalVisible(true);
    }
    const getData = (pageNumber: number) => {
        let _updateInfoPage: any = { isLoading: true, page: pageNumber, isRefresh: pageNumber === 1 };
        setInfoPage({ ...infoPage, ..._updateInfoPage });
        const paramAdd = { menuId: menuId, windowId: windowId, start: (pageNumber - 1) * infoPage.count, count: infoPage.count };
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
        }, (v: boolean) => { }, config)
    }

    useEffect(() => {
        getData(infoPage.page);
    }, [])

    const onRefresh = () => {
        getData(1);
    };
    const onEndReached = () => {
        if (!infoPage.isLoading && infoPage.page < infoPage.totalPage) {
            getData(infoPage.page + 1);
        }
    };
    const onDelete = () => {
        showSweetAlert({
            text: 'Bạn có muốn xóa không',
            cancelButtonText: "Không",
            confirmButtonText: "Có",
            showCancelButton: true,
            onConfirm: () => {
                setModalVisible(false);
                const config = {
                    headers: {
                        "X-Menu": menuId,
                    }
                }
                deleteApiLink(API_LINK.WINDOW.DELETE + itemSelect.id, config, (res) => {
                    setData((data) => data.filter(item => item.id !== itemSelect.id));
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
                    setModalVisible(false);
                    getData(1);
                }, setRunApi);
            } else {
                postApiLink(API_LINK.WINDOW.POST, values, (res) => {
                    setModalVisible(false);
                    // setData([res, ...data]);
                    getData(1);
                }, setRunApi, config);
            }
        }
    }
    const callBack = (type: "delete" | "update", values?: any) => {
        type === "delete" ? onDelete() : onSave(values);
    }
    const renderModal = useMemo(() => {
        return <ModalWindow windowId={windowId} item={itemSelect} callBack={callBack} />
    }, [itemSelect]);
    return (
        <View style={{ flex: 1, backgroundColor: "#c1c1c1" }}>
            <View style={[styles.header]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.detail}>{data.length}/{infoPage.numRow}</Text>
            </View>

            <VcSearchBarWin onAdd={() => selectItem(null)} />
            <FlatList
                keyExtractor={item => item.id}
                data={data}
                renderItem={({ item }: any) => {
                    return (
                        <PressItem
                            key={item.id}
                            onPress={() => selectItem(item)}
                            item={item}>
                            <ItemWindow windowId={windowId} item={item} />
                        </PressItem>
                    );
                }}
                ItemSeparatorComponent={(progs) => <VcLine />}
                refreshControl={
                    <RefreshControl
                        refreshing={infoPage.isRefresh}
                        onRefresh={onRefresh}
                        colors={[APP_COLOR.BG_DARKRED]}
                    />
                }
                onEndReachedThreshold={0.1} // Khi cuộn đến 90% màn hình, bắt đầu load thêm
                onEndReached={onEndReached}
                ListFooterComponent={() =>
                    infoPage.isLoading ? <ActivityIndicator size="large" color={APP_COLOR.PRIMARY2} /> : null
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modal}>
                    <View style={styles.headerModal}>
                        <AntDesign name={itemSelect ? "edit" : "plus"} size={25} color="black" />
                        <Text style={{ flex: 1, fontSize: 18, textAlign: "center" }}>{itemSelect ? "Sửa" : "Thêm mới"}</Text>
                        <View style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
                            {runApi ? <ActivityIndicator size='large' color={APP_COLOR.PRIMARY2} /> : <VcButtonFlat type="clear" icon={<AntDesign name="close" size={20} color="black" />} onPress={() => setModalVisible(!modalVisible)} />}
                        </View>
                    </View>
                    {renderModal}
                </View>
            </Modal>
            {(modalVisible) && <LoadingOverlay animating={false} />}
        </View>

    );
}

interface Ipros {
    item: any,
    children?: any,
    onPress: (item: any) => void
}
const PressItem = React.memo((progs: Ipros) => {
    const { item, children, onPress } = progs;
    return (
        <Pressable
            style={({ pressed }) =>
                ([styles.pressStyle, { opacity: pressed ? 0.8 : 1 }])}
            onPress={() => {
                onPress(item)
            }}
        >
            {children}
        </Pressable>
    )
})
const styles = StyleSheet.create({
    header: {
        backgroundColor: APP_COLOR.SECOND2,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        gap: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: "600"
    },
    detail: {
        color: APP_COLOR.BG_DARKRED,
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2,
        fontSize: 25,
        fontWeight: "600"
    },
    modal: {
        height: 'auto',
        marginTop: 'auto'
    },
    headerModal: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: "center",
        backgroundColor: APP_COLOR.SECOND2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    pressStyle: {

    }
})
export default WindowData;