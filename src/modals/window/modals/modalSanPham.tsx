import { APP_COLOR } from "@/utils/constant";
import * as Yup from 'yup';
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import React from "react";
import VcInput from "@/components/vcinput";
import VcButton from "@/components/vcbutton";
import VcPicker from "@/components/vcPicker";
import { API_LINK } from "@/utils/apiLink";
import VcInputNumber from "@/components/vcInputNum";
import VcCheckBox from "@/components/vcCheckBox";
interface ICodeName {
    id: string,
    code: string,
    name: string,
    softwareTypeId: string,
    maintenanceContract: boolean,
    price: number
}
interface IProgs {
    item: ICodeName,
    callBack: (values?: any) => void
}
export const formSchema = Yup.object().shape({
    code: Yup.string()
        .required('Phải có mã'),
    name: Yup.string()
        .required('Phải có tên'),
    softwareTypeId: Yup.string()
        .required('Phải chọn loại phần mềm')
});
const ModalSanPham = (progs: IProgs) => {
    const { callBack } = progs;
    const initialValues = {
        id: progs?.item?.id ?? null,
        code: progs?.item?.code ?? "",
        name: progs?.item?.name ?? "",
        softwareTypeId: progs?.item?.softwareTypeId ?? "",
        maintenanceContract: progs?.item?.maintenanceContract ?? false,
        price: progs?.item?.price ?? null
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
                {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
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
                            <VcPicker
                                label="Tên truy cập"
                                apiUrl={API_LINK.REF.SOFTWARETYPES}
                                value={values.softwareTypeId}
                                onSelect={handleChange('softwareTypeId')}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                                <VcInputNumber
                                    label="Giá bán" placeholder="Nhập giá tiền"
                                    onBlur={handleBlur('price')}
                                    setNumber={(num) => setFieldValue("price", num)}
                                    number={values.price}
                                    style={{ width: "50%" }}
                                />
                                <VcCheckBox
                                    label="Hợp đồng bảo trì"
                                    checked={values.maintenanceContract}
                                    onChange={(checked) => setFieldValue("maintenanceContract", checked)} />
                            </View>
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
export default ModalSanPham;