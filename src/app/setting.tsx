import BackGroundScreen from "@/components/backgroundscreen";
import { getApiLink } from "@/utils/api";
import { API_LINK } from "@/utils/apiLink";
import { APP_COLOR } from "@/utils/constant";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { AntDesign } from '@expo/vector-icons';
import VcBackButton from "@/components/vcBackButton";
import empty_logo from "@/assets/images/auth/empty_logo.png";
import VcButtonFlat from "@/components/vcButtonFlat";
import { Modal } from "react-native";
import React from "react";
import ModalChangeName from "@/modals/modalChangeName";
import ModalChangePass from "@/modals/modalChangePass";
import ModalCamera from "@/modals/modalCamera";
import SweetAlert from "@/components/sweetalert";
import { VcStore } from "@/redux/vcStore";

import LoadingOverlay from "@/components/overlay";
import { useSelector } from "react-redux";
import { TextHeader } from "@/components/textHeader";
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: APP_COLOR.PRIMARY2
    },
    role: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2,
        backgroundColor: APP_COLOR.SECOND2
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})
interface IRole {
    name: string
}
enum viewType {
    none,
    camera,
    changeName,
    changePass
}
const Setting = () => {
    const params: any = useLocalSearchParams();
    const logo = useSelector((state: VcStore) => state.app.logo)
    const [role, setRole] = useState<IRole[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [typeViewModal, setTypeViewModal] = useState(viewType.none);
    const renderViewModel = useMemo(() => {
        switch (typeViewModal) {
            case viewType.camera:
                return <ModalCamera setModalVisible={setModalVisible} />
            case viewType.changeName:
                return <ModalChangeName setModalVisible={setModalVisible} />
            case viewType.changePass:
                return <ModalChangePass setModalVisible={setModalVisible} />
            default:
                return <View />
        }
    }, [(typeViewModal)]);
    useEffect(() => {
        getApiLink(API_LINK.SETTING.CURRENT_ROLE, (res) => {
            setRole(res);
        });
    }, []);
    return (
        <BackGroundScreen>

            <View style={{ flex: 1, gap: 10, paddingHorizontal: 50 }}>
                <TextHeader title="TÀI KHOẢN" />
                <VcBackButton />
                <View style={styles.logo}>
                    <Image style={styles.image} source={logo ? { uri: logo } : empty_logo} />
                    <VcButtonFlat
                        onPress={() => {
                            setModalVisible(true);
                            setTypeViewModal(viewType.camera);
                        }}
                        pressStyle={{ position: "absolute", bottom: 0, right: -5 }}
                        icon={<AntDesign name="camera" size={20} color={APP_COLOR.PRIMARY2} />}
                        type="clear"
                    />
                </View>
                <Text style={{ fontFamily: "600", fontSize: 20, textAlign: "center" }}>{params.username}</Text>
                <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
                    {
                        role.map(item => {
                            return (<Text key={item.name} style={styles.role}>{item.name}</Text>)
                        })
                    }
                </View>
                <DrawerItem
                    label="Sửa tên"
                    style={{ borderColor: APP_COLOR.PRIMARY2, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.4)' }}
                    onPress={() => {
                        setTypeViewModal(viewType.changeName);
                        setModalVisible(true);
                    }}
                    icon={() => (<AntDesign name="edit" size={20} color="black" />)}
                    labelStyle={{ alignSelf: "center" }}
                />
                <DrawerItem
                    label="Đổi mật khẩu"
                    style={{ borderColor: APP_COLOR.PRIMARY2, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.4)' }}
                    onPress={() => {
                        setTypeViewModal(viewType.changePass);
                        setModalVisible(true);
                    }}
                    icon={() => (<AntDesign name="key" size={20} color="black" />)}
                    labelStyle={{ alignSelf: "center" }}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {renderViewModel}
                    </View>
                </View>
            </Modal>
            {modalVisible && <LoadingOverlay animating={false} />}
            <SweetAlert />
        </BackGroundScreen>
    );
}
export default Setting;