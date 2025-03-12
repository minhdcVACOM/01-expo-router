import ModalCodeName from "@/modals/window/modals/modalCodeName";
import ModalNhanVien from "@/modals/window/modals/modalNhanVien";
import { WINDOW_ID } from "@/utils/constant";
import React from "react";
import { Text } from "react-native";
interface IProgs {
    windowId: string,
    item: any,
    callBack: (type: "delete" | "update", values?: any) => void
}
const ModalWindow = (progs: IProgs) => {
    const { windowId, item, callBack } = progs;
    switch (windowId) {
        case WINDOW_ID.NHAN_VIEN:
            return (
                <ModalNhanVien callBack={callBack} item={item} />
            );
        default:
            return (
                <ModalCodeName callBack={callBack} item={item} />
            );
    }
}
export default ModalWindow;