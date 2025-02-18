import VcButton from "@/components/vcbutton";
import VcInput from "@/components/vcinput";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-root-toast';
import { apiGetTenant } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
const SignUp = () => {

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [passWord, setPassWord] = useState<string>();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await apiGetTenant();
                Toast.show(res.tenantId);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, []);

    return (
        <SafeAreaView>
            <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: "600" }}>Đăng ký tài khoản</Text>
            </View>
            <VcInput label="Họ và tên" value={name} setValue={setName} placeholder="Nhập họ và tên" keyboardType="numeric" />
            <VcInput label="Hòm thư" value={email} setValue={setEmail} placeholder="Nhập địa chỉ hồm thư" keyboardType="email-address" />
            <VcInput label="Mật khẩu" value={passWord} setValue={setPassWord} placeholder="nhập mật khẩu" secureTextEntry={true} />
            <VcButton title="Đăng ký" pressStyle={{ marginHorizontal: 100, marginVertical: 20 }}
                onPress={() => alert('me')}
            />
            <Text style={{ textAlign: "center" }}>Đã có tài khoản?
                <Link href={"/(auth)/login"}>
                    <Text style={{ fontWeight: "600", textDecorationLine: "underline" }}> Đăng nhập</Text>
                </Link>
            </Text>
        </SafeAreaView >
    );
}
export default SignUp;