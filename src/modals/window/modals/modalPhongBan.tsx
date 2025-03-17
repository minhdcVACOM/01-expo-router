import { APP_COLOR } from "@/utils/constant";
import * as Yup from 'yup';
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import React from "react";
import VcInput from "@/components/vcinput";
import VcPicker from "@/components/vcPicker";
import { API_LINK } from "@/utils/apiLink";
import VcPickerMutySelect from "@/components/vcPickerMutySelect";
import VcCheckBox from "@/components/vcCheckBox";
import VcButton from "@/components/vcbutton";
interface ICodeName {
    id: string,
    code: string,
    name: string,
    isSupportCus: string,
    departmentId: string,
    softwareTypeIds: string
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
const ModalPhongBan = (progs: IProgs) => {
    const { callBack } = progs;
    const initialValues = {
        id: progs?.item?.id ?? null,
        code: progs?.item?.code ?? "",
        name: progs?.item?.name ?? "",
        isSupport: progs?.item?.isSupportCus && progs?.item?.isSupportCus === "C" ? true : false,
        departmentId: progs?.item?.departmentId ?? "",
        softwareTypeIds: progs?.item?.softwareTypeIds ?? ""
    }
    const onSubmit = (values: typeof initialValues) => {
        // chuẩn hóa dữ liệu
        callBack({ ...values, isSupportCus: values.isSupport ? "C" : "K" });
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={formSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                    <View style={{ paddingHorizontal: 10 }}>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                                <VcInput
                                    label="Mã"
                                    value={values.code}
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    textError={errors.code}
                                    autoCapitalize="characters"
                                    containerStyle={{ width: "50%" }}
                                />
                                <VcCheckBox
                                    label="Hỗ trợ khách hàng"
                                    checked={values.isSupport}
                                    onChange={(checked) => setFieldValue("isSupport", checked)} />
                            </View>

                            <VcInput
                                label="Tên"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                textError={errors.name}
                            />
                            <VcPicker
                                label="Phòng ban"
                                apiUrl={API_LINK.REF.DEPARTMENT}
                                value={values.departmentId}
                                onSelect={handleChange('departmentId')}
                            />
                            <VcPickerMutySelect
                                label="Tên truy cập"
                                apiUrl={API_LINK.REF.SOFTWARETYPES}
                                value={values.softwareTypeIds}
                                onSelect={handleChange('softwareTypeIds')}
                            />
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
export default ModalPhongBan;