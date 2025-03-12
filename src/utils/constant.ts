export const APP_COLOR = {
    PRIMARY1: "#192a51",
    PRIMARY2: "#967aa1",
    PRIMARY_TEXT: "#fff",
    MEDIUM: "#aaa1c8",
    SECOND1: "#d5c6e0",
    SECOND2: "#f5e6e8",
    SECOND_TEXT: "#212121",

    BG_DARKRED: "#a23226",
    BG_DARKORANGE: "#f4511e",
    BG_ORANGE: "#FF8C00",
    BG_PURPLE: "#a020f0",
    BG_YELLOW: "#ffff00",

    RED: "#e74c3c",
    BLUE: "#3498db",
    GREEN: "#2ecc71",
    YELLOW: "#f39c12",
    PURPLE: "#967aa1",

    GRAYLIGHT: "#F2F2F2",
    GRAY: "#A9A9A9",
    GRAYDARK: "#696969"
}
export const APP_KEY = {
    KEY_LOGIN: "infoLogin",
    KEY_API: "linkApi",
    KEY_TOKEN: "token",
    DVCS_ID: "dvcs_id",
    KEY_TENANT: "__tenant",
}
export const WINDOW_ID = {
    NHAN_VIEN: "646f25ee163b075e01b935b9",
    LOAI_PHAN_MEM: "64d5cadebc2470bc11c2e4cb",
    SAN_PHAM: "64e5c4957d287b8bddd64f58",
    LOAI_HOP_DONG: "651e63485755ec9bd3c586e3",
    CHUC_VU: "646f1dbf163b075e01b93557",
    PHONG_BAN: "646f21d6163b075e01b9357f",
    TINH_THANH: "647858428b16f9e4f72d2041",
    DON_VI_TINH: "64ec5d161b2fd0cceadad9cf",
    LY_DO_CHUYEN_KHOAN: "65d6d0f54e0dfb3826b17796",
    LOAI_BAO_GIA: "651f8090147babf9df26f387"
}
export const APP_DATA = {
    MENU_PUBLIC_LIST: [
        {
            title: 'Danh mục chính',
            data: [
                {
                    title: "Nhân viên",
                    windowId: WINDOW_ID.NHAN_VIEN,
                    menuId: "646f29ff163b075e01b935c7"
                },
                {
                    title: "Loại phần mềm",
                    windowId: WINDOW_ID.LOAI_PHAN_MEM,
                    menuId: "64d5cca4bc2470bc11c2e4dd"
                },
                {
                    title: "Sản phẩm",
                    windowId: WINDOW_ID.SAN_PHAM,
                    menuId: "64e5c6787d287b8bddd64f60"
                },
                {
                    title: "Loại hợp đồng",
                    windowId: WINDOW_ID.LOAI_HOP_DONG,
                    menuId: "651e65a85755ec9bd3c586f5",
                    marginBottom: 10
                }
            ]
        },
        {
            title: 'Danh mục khác',
            data: [
                {
                    title: "Chức vụ",
                    windowId: WINDOW_ID.CHUC_VU,
                    menuId: "646f1fdc163b075e01b9356d"
                },
                {
                    title: "Phòng ban",
                    windowId: WINDOW_ID.PHONG_BAN,
                    menuId: "646f23e3163b075e01b93587"
                },
                {
                    title: "Tỉnh thành",
                    windowId: WINDOW_ID.TINH_THANH,
                    menuId: "64785a7b8b16f9e4f72d2053"
                },
                {
                    title: "Đơn vị tính",
                    windowId: WINDOW_ID.DON_VI_TINH,
                    menuId: "64ec5e101b2fd0cceadad9d5"
                },
                {
                    title: "Lý do chuyển khoản",
                    windowId: WINDOW_ID.LY_DO_CHUYEN_KHOAN,
                    menuId: "65d6d3e64e0dfb3826b177a8"
                },
                {
                    title: "Loại báo giá",
                    windowId: WINDOW_ID.LOAI_BAO_GIA,
                    menuId: "651f824f147babf9df26f38f",
                    marginBottom: 200
                }
            ]
        }
    ]
}