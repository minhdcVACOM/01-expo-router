import LoadingOverlay from "@/components/overlay";
import VcButton from "@/components/vcbutton";
import VcInput from "@/components/vcinput";
import { apiLogin } from "@/utils/api";
import { APP_COLOR, APP_KEY } from "@/utils/constant";
import { loginSchema } from "@/utils/validate";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { Switch, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showSweetAlert } from "@/components/sweetalert";
interface IForm {
    tenant: string,
    userName: string,
    passWord: string,
    remember?: boolean
}
const LoginScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState(false);
    const [apiLink, setApiLink] = useState<string>();
    const [initialValues, setInitialValues] = useState<IForm>({ tenant: "", userName: "", passWord: "" });
    const Login = (values: IForm) => {
        const { tenant, userName, passWord } = values;
        apiLogin(tenant, userName, passWord, async (res) => {
            if (remember) {
                await AsyncStorage.setItem(APP_KEY.KEY_LOGIN, JSON.stringify({
                    tenant: tenant,
                    userName: userName,
                    passWord: passWord,
                    remember: true
                }))
            } else {
                await AsyncStorage.removeItem(APP_KEY.KEY_LOGIN);
            }
            await AsyncStorage.setItem(APP_KEY.KEY_TOKEN, res.token);
            router.replace({
                pathname: "/lstdvcs",
                params: res
            });
        }, (loading) => setLoading(loading))
    }
    const EditLinkApi = () => {
        showSweetAlert({
            title: "Cài đặt",
            showCancelButton: false,
            showIcon: true,
            type: "setting",
            confirmButtonText: 'Xác nhận',
            onConfirm: (v: any) => {
                if (v?.inputValue && v.inputValue !== apiLink) {
                    setApiLink(v.inputValue);
                    const saveLink = async () => {
                        await AsyncStorage.setItem(APP_KEY.KEY_API, v.inputValue ?? "");
                    }
                    saveLink();
                }
            },
            onClose: () => {
                console.log('Closed');
            },
            optionInput: {
                labelInput: "Xác nhận link API",
                valueInput: () => { return apiLink ?? "" }
            }
        });
    }
    let infoLogin: IForm;
    useEffect(() => {
        const getInfoLogin = async () => {
            try {
                const sInfoLogin = await AsyncStorage.getItem(APP_KEY.KEY_LOGIN);
                if (sInfoLogin) infoLogin = JSON.parse(sInfoLogin);
                if (infoLogin) {
                    setRemember(infoLogin.remember ?? false);
                    setInitialValues({
                        tenant: infoLogin.tenant,
                        userName: infoLogin.userName,
                        passWord: infoLogin.passWord
                    })
                }
                const sApiLink = await AsyncStorage.getItem(APP_KEY.KEY_API);
                setApiLink(sApiLink ?? process.env.EXPO_PUBLIC_API_URL!);
            } catch (error) { }
        }
        getInfoLogin();
    }, [])
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={Login}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        <VcInput
                            label="Mã truy cập"
                            value={values.tenant}
                            onChangeText={handleChange('tenant')}
                            onBlur={handleBlur('tenant')}
                            placeholder="Nhập mã truy cập"
                            textError={errors.tenant}
                            autoCapitalize="characters"
                        />
                        <VcInput
                            label="Tên truy cập"
                            value={values.userName}
                            onChangeText={handleChange('userName')}
                            onBlur={handleBlur('userName')}
                            placeholder="Nhập tên truy cập"
                            textError={errors.userName}
                        />
                        <VcInput
                            label="Mật khẩu"
                            value={values.passWord}
                            onChangeText={handleChange('passWord')}
                            onBlur={handleBlur('passWord')}
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
                        <View style={{ flexDirection: "row", marginHorizontal: 10, gap: 10, justifyContent: "center", alignItems: "center" }}>
                            {/* <VcCheckBox label="Ghi nhớ ?" value={values.remember}
                            // @ts-ignore:next-line
                            /> */}
                            <Text style={{ color: "white" }}>Ghi nhớ ?</Text>
                            <Switch
                                thumbColor={"white"}
                                trackColor={{ false: '#767577', true: APP_COLOR.BG_ORANGE }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={setRemember}
                                value={remember}
                            />
                            <Pressable onPress={
                                () => router.navigate({
                                    pathname: "/(auth)/forgotpass",
                                    params: { tenant: values.tenant }
                                })
                            }>
                                <Text style={{ fontWeight: "600", textDecorationLine: "underline", color: APP_COLOR.BG_ORANGE }}>Quên mật khẩu?</Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={EditLinkApi} >
                            <Text style={{ fontWeight: "600", textDecorationLine: "underline", color: "gray", marginBottom: 10, textAlign: "center" }}>{apiLink}</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
            {loading && <LoadingOverlay animating={false} />}
        </>
    );
}
export default LoginScreen;