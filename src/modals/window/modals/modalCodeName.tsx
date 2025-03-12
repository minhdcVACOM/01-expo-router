import { APP_COLOR } from "@/utils/constant";
import * as Yup from 'yup';
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import React from "react";
import VcInput from "@/components/vcinput";
import VcButton from "@/components/vcbutton";
import { Entypo } from "@expo/vector-icons";
import VcDatePicker from "@/components/vcDatePicker";
import VcPicker from "@/components/vcPicker";
import { API_LINK } from "@/utils/apiLink";
import VcInputNumber from "@/components/vcInputNum";
import VcPickerMutySelect from "@/components/vcPickerMutySelect";
interface ICodeName {
    id: string,
    code: string,
    name: string
}
interface IProgs {
    item: ICodeName,
    callBack: (type: "delete" | "update", values?: any) => void
}
export const formSchema = Yup.object().shape({
    code: Yup.string()
        .required('Phải có mã'),
    name: Yup.string()
        .required('Phải có tên')
});
const ModalCodeName = (progs: IProgs) => {
    const { callBack } = progs;
    const initialValues = {
        id: progs?.item?.id ?? null,
        code: progs?.item?.code ?? "",
        name: progs?.item?.name ?? ""
    }
    const onSubmit = (values: typeof initialValues) => {
        // chuẩn hóa dữ liệu
        callBack("update", values);
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={formSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ backgroundColor: "#fff", paddingHorizontal: 10 }}>
                        <View>
                            <VcInput
                                label="Mã"
                                value={values.code}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                textError={errors.code}
                                autoCapitalize="characters"
                                containerStyle={{ width: "50%" }}
                            />
                            <VcInput
                                label="Tên"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                textError={errors.name}
                            />
                            <VcPickerMutySelect
                                label="Người dùng"
                                apiUrl={API_LINK.REF.USER}
                                fDisplay="name"
                                fShow="name"
                            />
                        </View>
                        <View style={styles.footerModal}>
                            <VcButton
                                icon={<Entypo name="trash" size={24} color="white" />}
                                title="Xóa"
                                onPress={() => callBack("delete")}
                            />
                            <VcButton
                                icon={<Entypo name="edit" size={24} color="white" />}
                                title="Ghi"
                                onPress={handleSubmit}
                                type="info"
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: APP_COLOR.PRIMARY2
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    details: {

    },
    footerModal: {
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "#fff",
        gap: 10,
        padding: 10
    },
})
export default ModalCodeName;