import { APP_COLOR } from "@/utils/constant";
import * as Yup from 'yup';
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import React from "react";
import VcInput from "@/components/vcinput";
import VcButton from "@/components/vcbutton";
interface ICodeName {
    id: string,
    code: string,
    name: string
}
interface IProgs {
    item: ICodeName,
    callBack: (values?: any) => void
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
        callBack(values);
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
                    <View style={{ paddingHorizontal: 10 }}>
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
                            {/* <VcPickerMutySelect
                                label="Người dùng"
                                apiUrl={API_LINK.REF.USER}
                                fDisplay="name"
                                fShow="name"
                            />
                            <VcInputNumber label="Nhập số" placeholder="Nhập giá tiền" /> */}
                        </View>
                        <View style={styles.footerModal}>
                            <VcButton title="Ghi" btnStyle={{ width: 100 }} onPress={handleSubmit} />
                        </View>
                    </View>
                )}
            </Formik>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
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
        gap: 10,
        padding: 10
    },
})
export default ModalCodeName;