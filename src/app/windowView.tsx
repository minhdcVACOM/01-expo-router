import { useLocalSearchParams } from "expo-router";
import React from "react";
import WindowData from "@/screens/windowData";
import SweetAlert from "@/components/sweetalert";
const WindowView = () => {
    const param: any = useLocalSearchParams();
    return (
        <>
            <WindowData {...param} />
            <SweetAlert />
        </>
        // <>
        //     <VcSearchBarWin onAdd={() => { }} />
        //     <View style={{ flex: 1, gap: 10, paddingHorizontal: 10 }}>

        //     </View>
        // </>
    );
}
export default WindowView;