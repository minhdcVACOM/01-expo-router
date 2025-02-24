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
