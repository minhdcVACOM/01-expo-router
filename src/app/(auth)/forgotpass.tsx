import VcButton from "@/components/vcbutton";
import VcInput from "@/components/vcinput";
import OTPTextView from 'react-native-otp-textinput';
import { Alert, Pressable, Text, View } from "react-native";
import { apiRecoverPass, apiSendOtp } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingOverlay from "@/components/overlay";
import React, { useState } from "react";
import { Formik } from 'formik';
import BackGroundScreen from "@/components/backgroundscreen";
import { forgotPassSchema } from "@/utils/validate";
import SweetAlert, { showSweetAlert } from "@/components/sweetalert";

interface IParams {
    tenant?: string
}
interface IForm {
    tenant: string,
    email: string,
    otp: string,
}
const ForgotPass = () => {
    const params: IParams = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [typeSubmit, setTypeSubmit] = useState<number>(0);

    const FormSubmit = (values: IForm) => {
        if (typeSubmit === 0) {
            recoverPass(values.tenant, values.email, values.otp);
        } else {
            sendOtp(values.tenant, values.email);
        }
    }

    const sendOtp = (tenant: string, email: string) => {
        apiSendOtp(tenant, email, (res) => {
            Helper.toastShow(res.msg);
        }, (loading) => setLoading(loading));
    }
    const recoverPass = (tenant: string, email: string, otp: string) => {
        if (!otp || otp.length < 6) {
            console.log("lỗi");
            showSweetAlert({
                // title: 'Thông báo',
                text: 'Bạn chưa nhập đủ mã OTP',
                showCancelButton: true,
                cancelButtonText: 'Hủy bỏ',
                confirmButtonText: 'Xác nhận',
                onConfirm: () => {
                    console.log('Confirmed');
                },
                onClose: () => {
                    console.log('Closed');
                },
                type: 'question', // 'info', 'success', 'danger', 'warning' , "question"
            });
            return;
        }
        apiRecoverPass(tenant, email, otp, (res) => {
            Helper.toastShow(res.msg);
            router.back();
        }, (loading) => setLoading(loading));
    }
    return (
        <>
            <BackGroundScreen>
                <Formik
                    initialValues={{ tenant: params.tenant!, email: '', otp: '' }}
                    onSubmit={FormSubmit}
                    validationSchema={forgotPassSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600" }}>QUÊN MẬT KHẨU</Text>
                            </View>
                            <VcInput
                                label="Mã truy cập"
                                value={values.tenant}
                                onChangeText={handleChange('tenant')}
                                placeholder="Nhập mã truy cập"
                                autoCapitalize="characters"
                                textError={errors.tenant}
                            />
                            <VcInput
                                label="Hòm thư"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                placeholder="Nhập địa chỉ hòm thư"
                                keyboardType="email-address"
                                textError={errors.email}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                                <Text>Nhập mã OTP</Text>
                                <Pressable onPress={() => {
                                    setTypeSubmit(1);
                                    handleSubmit();
                                }} style={({ pressed }) =>
                                    ({ opacity: pressed === true ? 0.8 : 1 })}>
                                    <Text style={{ fontWeight: "600", color: "blue", textDecorationLine: "underline" }}> (Lấy mã OTP)</Text>
                                </Pressable>
                            </View>
                            <OTPTextView
                                defaultValue={values.otp}
                                handleTextChange={handleChange('otp')}
                                // ref={inputOtp}
                                containerStyle={{ marginHorizontal: 20 }}
                                textInputStyle={{
                                    borderColor: APP_COLOR.PRIMARY1,
                                    backgroundColor: "#fff",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderBottomWidth: 1,
                                    // @ts-ignore:next-line
                                    color: APP_COLOR.BG_DARKRED
                                }}
                                inputCount={6}
                                tintColor={APP_COLOR.PRIMARY1}
                            />
                            <VcButton title="Lấy lại mật khẩu" pressStyle={{ marginHorizontal: 100, marginVertical: 20 }}
                                onPress={() => {
                                    setTypeSubmit(0);
                                    handleSubmit();
                                }} loading={loading && !typeSubmit}
                            />
                        </View >
                    )}
                </Formik>
            </BackGroundScreen>
            {loading && <LoadingOverlay animating={loading && !typeSubmit ? false : true} />}
            <SweetAlert />
        </>
    );
}
export default ForgotPass;