import VcButton from "@/components/vcbutton";
import VcInput from "@/components/vcinput";
import OTPTextView from 'react-native-otp-textinput';
import { Text, View } from "react-native";
import { apiRecoverPass, apiSendOtp } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingOverlay from "@/components/overlay";
import React, { useState } from "react";
import { Formik } from 'formik';
import BackGroundScreen from "@/components/backgroundscreen";
import { forgotPassSchema } from "@/utils/validate";
import { showSweetAlert } from "@/components/sweetalert";
import VcButtonFlat from "@/components/vcButtonFlat";
import VcBackButton from "@/components/vcBackButton";
import { TextHeader } from "@/components/textHeader";
import VcCadView from "@/components/vcCardView";

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
            showSweetAlert({
                // title: 'Thông báo',
                text: 'Bạn chưa nhập đủ mã OTP',
                showCancelButton: false,
                // cancelButtonText: 'Hủy bỏ',
                confirmButtonText: 'Xác nhận',
                onConfirm: () => {
                    // console.log('Confirmed');
                },
                // onClose: () => {
                //     console.log('Closed');
                // },
                type: 'warning', // 'info', 'success', 'danger', 'warning' , "question"
            });
            return;
        }
        apiRecoverPass(tenant, email, otp, (res) => {
            Helper.toastShow(res.msg);
            // router.replace("/start");
            router.back();
        }, (loading) => setLoading(loading));
    }
    // useEffect(() => {
    //     const backAction = () => {
    //         router.replace("/start");
    //         return true;
    //     };
    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction,
    //     );
    //     return () => backHandler.remove();
    // }, [])
    return (
        <>
            <VcBackButton />
            <Formik
                initialValues={{ tenant: params.tenant!, email: '', otp: '' }}
                onSubmit={FormSubmit}
                validationSchema={forgotPassSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ marginHorizontal: 10 }}>
                        <TextHeader title="QUÊN MẬT KHẨU" />
                        <VcCadView>
                            <>
                                <VcInput
                                    label="Mã truy cập"
                                    value={values.tenant}
                                    onChangeText={handleChange('tenant')}
                                    onBlur={handleBlur('tenant')}
                                    placeholder="Nhập mã truy cập"
                                    autoCapitalize="characters"
                                    textError={errors.tenant}
                                />
                                <VcInput
                                    label="Hòm thư"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    placeholder="Nhập địa chỉ hòm thư"
                                    keyboardType="email-address"
                                    textError={errors.email}
                                />
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                                    <Text>Nhập mã OTP</Text>
                                    <VcButtonFlat
                                        onPress={
                                            () => {
                                                setTypeSubmit(1);
                                                handleSubmit();
                                            }
                                        }
                                        title="(Lấy mã OTP)"
                                        textStyle={{ color: APP_COLOR.RED }}
                                    />
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
                            </>
                        </VcCadView>
                    </View >
                )}
            </Formik>
            {loading && <LoadingOverlay animating={loading && !typeSubmit ? false : true} />}
        </>
    );
}
export default ForgotPass;