import { getApiLink, postApiLink } from "@/utils/api";
import { API_LINK } from "@/utils/apiLink";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { accountNameSchema } from "@/utils/validate";
import VcInput from "@/components/vcinput";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import VcButtonFlat from "@/components/vcButtonFlat";

const width = Dimensions.get("window").width - 50;
interface IForm {
    name: string,
    email: string
}
const ModalChangeName = ({ setModalVisible }: { setModalVisible: (modalVisible: boolean) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IForm>({ name: "", email: "" });
    useEffect(() => {
        getApiLink(API_LINK.SETTING.CURRENT_INFO, (res) => {
            setData(res);
        });
    }, [])
    const onSbumit = (values: IForm) => {
        postApiLink(API_LINK.SETTING.SAVE_CURRENT_INFO, values, (res) => {
            setModalVisible(false);
        }, setLoading);
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={data}
                onSubmit={(onSbumit)}
                validationSchema={accountNameSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ width: width }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 50 }}>
                            <Text style={{ fontWeight: "600", fontSize: 18, flex: 1, textAlign: "center" }}>Sửa tên</Text>
                            <View style={{ width: 50 }}>
                                {loading ? <ActivityIndicator size={"large"} color={APP_COLOR.PRIMARY2} />
                                    : <VcButtonFlat
                                        onPress={handleSubmit}
                                        icon={<AntDesign name="checkcircle" size={25} color={APP_COLOR.PRIMARY2} />}
                                        type="clear"
                                    />}
                            </View>
                        </View>
                        <VcInput
                            label="Tên truy cập"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            placeholder="Nhập tên truy cập"
                            textError={errors.name}
                        />
                        <VcInput
                            label="Email"
                            value={values.email}
                            disable={true}
                        />
                    </View>
                )}
            </Formik>
        </>
    );
}
export default ModalChangeName;