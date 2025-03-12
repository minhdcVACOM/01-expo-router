import * as Yup from 'yup';
export const forgotPassSchema = Yup.object().shape({
    tenant: Yup.string()
        .required('Phải có Mã truy cập'),
    email: Yup.string()
        .required('Phải có email')
        .email('email không hợp lệ'),
    // otp: Yup.string()
    //     .required('Phải có Otp')
    //     .min(6, "Bạn chưa nhập đủ OTP")
});
export const loginSchema = Yup.object().shape({
    tenant: Yup.string()
        .required('Phải có Mã truy cập'),
    userName: Yup.string()
        .required('Phải có Tên truy cập'),
    passWord: Yup.string()
        .required('Phải vào mật khẩu'),
});
export const accountNameSchema = Yup.object().shape({
    name: Yup.string()
        .required('Bạn phải nhập tên'),
    email: Yup.string()
        .required('Phải có email')
        .email('email không hợp lệ')
});
export const accountPassSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required('Phải vào mật khẩu'),
    newPassword: Yup.string()
        .required('Phải vào mật khẩu'),
    confirmPass: Yup.string()
        .required('Phải vào mật khẩu'),
});
