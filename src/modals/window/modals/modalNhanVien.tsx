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
interface INhanVien {
    id: string,
    code: string,
    name: string,
    birthday: string,
    isLeaved: boolean,
    note: string,
    departmentId: string,
    positionId: string,
    userId: string,
    tel: string,
    ext: string;
}
interface IProgs {
    item: INhanVien,
    callBack: (type: "delete" | "update", values?: any) => void
}
export const formSchema = Yup.object().shape({
    code: Yup.string()
        .required('Phải có Mã nhân viên'),
    name: Yup.string()
        .required('Phải có Tên nhân viên')
});
const ModalNhanVien = (progs: IProgs) => {
    const { callBack } = progs;
    const initialValues = {
        id: progs?.item?.id ?? null,
        code: progs?.item?.code ?? "",
        name: progs?.item?.name ?? "",
        birthday: progs?.item?.birthday ?? null,
        tel: progs?.item?.tel ?? "",
        userId: progs?.item?.userId ?? "",
        departmentId: progs?.item?.departmentId ?? "",
        positionId: progs?.item?.positionId ?? "",
        isLeaved: progs?.item?.isLeaved ?? false,
        note: progs?.item?.note ?? ""
    }
    const onSubmit = (values: typeof initialValues) => {
        // chuẩn hóa dữ liệu
        const _update = {
            birthday: values.birthday === "" ? null : values.birthday,
            userId: values.userId === "" ? null : values.userId,
            departmentId: values.departmentId === "" ? null : values.departmentId,
            positionId: values.positionId === "" ? null : values.positionId
        }
        callBack("update", { ...values, ..._update });
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
                        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                            <VcInput
                                label="Mã nhân viên"
                                value={values.code}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                textError={errors.code}
                                autoCapitalize="characters"
                                containerStyle={{ flex: 1 }}
                            />
                            <VcDatePicker label="Ngày sinh" value={values.birthday} setValue={handleChange('birthday')} />
                        </View>
                        <VcInput
                            label="Tên nhân viên"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            textError={errors.name}
                        />
                        <VcPicker
                            label="Tên truy cập"
                            apiUrl={API_LINK.REF.USER}
                            fDisplay="name"
                            fShow="name"
                            value={values.userId}
                            onSelect={handleChange('userId')}
                        />
                        <VcPicker
                            label="Phòng ban"
                            apiUrl={API_LINK.REF.DEPARTMENT}
                            value={values.departmentId}
                            onSelect={handleChange('departmentId')}
                        />
                        <VcPicker
                            label="Chức vụ"
                            apiUrl={API_LINK.REF.POSITIONS}
                            value={values.positionId}
                            onSelect={handleChange('positionId')}
                        />
                        <VcInput
                            label="Ghi chú"
                            value={values.note}
                            onChangeText={handleChange('note')}
                            onBlur={handleBlur('note')}
                            textError={errors.name}
                            multiline={true}
                        />
                        {/* <VcInputNumber
                            label="Nhập số tiền"
                            setNumber={(v) => console.log("number>>", v)}
                        /> */}
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
export default ModalNhanVien;