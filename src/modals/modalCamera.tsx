import VcButtonFlat from "@/components/vcButtonFlat";
import { APP_COLOR } from "@/utils/constant";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Helper } from "@/utils/helper";
import { postApiLink } from "@/utils/api";
import { API_LINK } from "@/utils/apiLink";
import vcAxios from "@/utils/vcaxios";
import { showSweetAlert } from "@/components/sweetalert";
import { useDispatch } from "react-redux";
import { setLogo } from "@/redux/slices/appSlice";

const FormData = global.FormData;
interface IProgs {
    setModalVisible: (modalVisible: boolean) => void
}
const ModalCamera = (progs: IProgs) => {
    const { setModalVisible } = progs
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const buttonClick = async (type: "camera" | "folder" | "delete") => {
        try {
            let result;
            switch (type) {
                case "camera":
                    await ImagePicker.requestCameraPermissionsAsync();
                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    });
                    break;
                case "folder":
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ["images"],
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    });
                    break;
                case "delete":
                    showSweetAlert({
                        text: 'Bạn có muốn xóa ảnh không?',
                        showCancelButton: true,
                        cancelButtonText: "Không",
                        confirmButtonText: 'Có',
                        onConfirm: async () => {
                            await deleteImage();
                            setModalVisible(false);
                        },
                        type: 'question'
                    });
                    break;
                default:
                    break;
            }
            if (result && !result.canceled) {
                // console.log("result>>", result);
                await updateImage(result.assets[0].uri, result.assets[0].base64!, result.assets[0].mimeType!, result.assets[0].fileName!, () => {
                    setModalVisible(false);
                });
            }
        } catch (error: any) {
            Helper.toastShow("Error update image", error.message)
        }
    }
    const updateImage = async (image: string, base64: string, mimeType: string, fileName: string, calBack?: () => void) => {
        try {
            const formData = new FormData();
            // @ts-ignore:next-line
            formData.append("upload", {
                uri: image,
                type: mimeType,
                name: fileName
            });
            formData.append("upload_fullpath", fileName);
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                },
                transformRequest: () => {
                    return formData;
                }
            }
            await vcAxios.post(API_LINK.SETTING.USER_LOGO_UPLOAD, formData, config)
                .then((res: any) => {
                    console.log("then error >> ", res);
                    if (res.error) {
                        showSweetAlert({
                            text: 'Kích thước ảnh có thể quá lớn, hãy thu nhỏ lại nhé!',
                            showCancelButton: false,
                            confirmButtonText: 'Xác nhận',
                            type: 'warning'
                        });
                        return;
                    } else {
                        dispatch(setLogo(image));
                        if (calBack) calBack();
                    }
                })
                .catch(error => {
                    console.log("ERROR >>", error);
                    if (setLoading) setLoading(false);
                    Helper.toastShow(JSON.stringify(error), true);
                });
        } catch (error: any) {
            console.log("ERROR >>", error);
            Helper.toastShow("Error update image", error.message)
        }
    }
    const deleteImage = async () => {
        try {
            await postApiLink(API_LINK.SETTING.USER_LOGO_DELETE, {}, (res) => {
                dispatch(setLogo(null));
            }, setLoading)
        } catch (error: any) {
            Helper.toastShow("Error update image", error.message)
        }
    }
    return (
        <View>
            <Text style={{ fontWeight: "600", fontSize: 20, textAlign: "center", marginBottom: 10 }}>Hình ảnh</Text>
            {loading ? <ActivityIndicator size={"large"} color={APP_COLOR.PRIMARY2} /> :
                <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center" }}>
                    <VcButtonFlat
                        onPress={() => buttonClick("camera")}
                        icon={<AntDesign name="camera" size={30} color={APP_COLOR.BLUE} />}
                        type="clear"
                    />
                    <VcButtonFlat
                        onPress={() => buttonClick("folder")}
                        icon={<Entypo name="folder" size={30} color={APP_COLOR.BG_ORANGE} />}
                        type="clear"
                    />
                    <VcButtonFlat
                        onPress={() => buttonClick("delete")}
                        icon={<Entypo name="trash" size={30} color={APP_COLOR.BG_DARKRED} />}
                        type="clear"
                    />
                </View>}
        </View>
    );
}

export default ModalCamera;