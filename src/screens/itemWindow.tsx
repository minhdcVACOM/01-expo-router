import ItemCode from "@/modals/window/items/itemCode";
import ItemCodeName from "@/modals/window/items/itemCodeName";
import ItemNhanVien from "@/modals/window/items/itemNhanVien";
import ItemSanPham from "@/modals/window/items/itemSanPham";
import { WINDOW_ID } from "@/utils/constant";
import React from "react";
import { Text } from "react-native";
interface IProgs {
    windowId: string,
    item: any
}
const ItemWindow = (progs: IProgs) => {
    const { windowId, item } = progs;
    switch (windowId) {
        case WINDOW_ID.NHAN_VIEN:
            return (
                <ItemNhanVien item={item} />
            );
        case WINDOW_ID.SAN_PHAM:
            return (
                <ItemSanPham item={item} />
            );
        case WINDOW_ID.DON_VI_TINH:
            return (
                <ItemCode item={item} />
            );
        default:
            return (
                <ItemCodeName item={item} />
            );
    }
}
export default ItemWindow;