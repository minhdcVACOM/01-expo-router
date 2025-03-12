import { API_LINK } from "@/utils/apiLink";
import { Formik } from "formik";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { accountPassSchema } from "@/utils/validate";
import VcInput from "@/components/vcinput";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import VcButtonFlat from "@/components/vcButtonFlat";
import { postApiLink } from "@/utils/api";

const width = Dimensions.get("window").width - 50;
interface IForm {
    currentPassword: string,
    newPassword: string,
    confirmPass: string
}
const ModalChangePass = ({ setModalVisible }: { setModalVisible: (modalVisible: boolean) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const onSbumit = (values: IForm) => {
        postApiLink(API_LINK.SETTING.CHANGE_PASSWORD, values, (res) => {
            setModalVisible(false);
        }, setLoading);
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ currentPassword: "", newPassword: "", confirmPass: "" }}
                onSubmit={(onSbumit)}
                validationSchema={accountPassSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ width: width }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 50 }}>
                            <Text style={{ fontWeight: "600", fontSize: 18, flex: 1, textAlign: "center" }}>Đổi mật khẩu</Text>
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
                            label="Mật khẩu hiện tại"
                            value={values.currentPassword}
                            onChangeText={handleChange('currentPassword')}
                            onBlur={handleBlur('currentPassword')}
                            placeholder="Nhập mật khẩu"
                            textError={errors.currentPassword && touched.currentPassword ? errors.currentPassword : ""}
                            secureTextEntry={true}
                        />
                        <VcInput
                            label="Mật khẩu mới"
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            placeholder="Nhập mật khẩu mới"
                            textError={errors.newPassword && touched.newPassword ? errors.newPassword : ""}
                            secureTextEntry={true}
                        />
                        <VcInput
                            label="Xác nhận mật khẩu"
                            value={values.confirmPass}
                            onChangeText={handleChange('confirmPass')}
                            onBlur={handleBlur('confirmPass')}
                            placeholder="Xác nhận mật khẩu"
                            textError={errors.confirmPass && touched.confirmPass ? errors.confirmPass : ""}
                            secureTextEntry={true}
                        />
                    </View>
                )}
            </Formik>
        </>
    );
}
export default ModalChangePass;