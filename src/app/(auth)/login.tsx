import LoadingOverlay from "@/components/overlay";
import VcButton from "@/components/vcbutton";
import VcCheckBox from "@/components/vccheckbox";
import VcInput from "@/components/vcinput";
import { apiLogin } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import { loginSchema } from "@/utils/validate";
import CheckBox from "@react-native-community/checkbox";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
interface IForm {
    tenant: string,
    userName: string,
    passWord: string,
    remember: boolean
}
const LoginScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const Login = (values: IForm) => {
        const { tenant, userName, passWord } = values;
        apiLogin(tenant, userName, passWord, (res) => {
            // console.log(res);
            router.replace({
                pathname: "/lstdvcs",
                params: res
            });
        }, (loading) => setLoading(loading))
    }
    return (
        <>
            <Formik
                initialValues={{ tenant: "VP", userName: 'MINHDC', passWord: 'Vacom@123', remember: false }}
                onSubmit={Login}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        <VcInput
                            label="Mã truy cập"
                            value={values.tenant}
                            onChangeText={handleChange('tenant')}
                            placeholder="Nhập mã truy cập"
                            textError={errors.tenant}
                            autoCapitalize="characters"
                        />
                        <VcInput
                            label="Tên truy cập"
                            value={values.userName}
                            onChangeText={handleChange('userName')}
                            placeholder="Nhập tên truy cập"
                            textError={errors.userName}
                        />
                        <VcInput
                            label="Mật khẩu"
                            value={values.passWord}
                            onChangeText={handleChange('passWord')}
                            placeholder="Nhập mật khẩu"
                            textError={errors.passWord}
                            secureTextEntry={true}
                        />
                        <VcButton
                            title="Đăng nhập"
                            onPress={handleSubmit}
                            btnStyle={{ borderColor: APP_COLOR.SECOND1 }}
                            pressStyle={{ paddingTop: 10, marginHorizontal: 80 }}
                            loading={loading}
                        />
                        <View style={{ flexDirection: "row", marginHorizontal: 20, gap: 10, justifyContent: "center", alignItems: "center", margin: 20 }}>
                            {/* <VcCheckBox label="Ghi nhớ ?" value={values.remember}
                            // @ts-ignore:next-line
                            /> */}
                            const [toggleCheckBox, setToggleCheckBox] = useState(false)

                            <CheckBox
                                disabled={false}
                            // value={toggleCheckBox}
                            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                            <Pressable onPress={
                                () => router.navigate({
                                    pathname: "/(auth)/forgotpass",
                                    params: { tenant: values.tenant }
                                })
                            }>
                                <Text style={{ fontWeight: "600", textDecorationLine: "underline", color: "white" }}> Quên mật khẩu?</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </Formik>
            {loading && <LoadingOverlay animating={false} />}
        </>
    );
}
export default LoginScreen;