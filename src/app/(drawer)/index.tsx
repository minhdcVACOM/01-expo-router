import VcButton from "@/components/vcbutton";
import VcDropdown from "@/components/vcdropdown";
import VcInput from "@/components/vcinput";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
interface IDropDownItem {
    value: string;
    label: string;
}
const HomeScreen = () => {
    const router = useRouter();
    const data: IDropDownItem[] = [
        { value: "1", label: "1-Item 01" },
        { value: "2", label: "2-Item 02" },
        { value: "3", label: "1-Item 03" },
        { value: "4", label: "2-Item 04" },
        { value: "5", label: "1-Item 05" },
        { value: "6", label: "2-Item 06" },
        { value: "7", label: "2-Item 07" },
        { value: "8", label: "1-Item 08" },
        { value: "9", label: "2-Item 09" }
    ];
    return (
        <View style={{ flex: 1, gap: 10 }}>
            {/* <Text>Home tab screen</Text> */}
            <VcInput label="Mã truy cập" />
            <VcDropdown
                title="Chọn Item"
                data={data}
                onChange={console.log}
                placeholder="Select country"
                defaultValue={data[0]}
                addTop={64}
            />
            <VcDropdown
                data={data}
                onChange={console.log}
                placeholder="Select country"
                defaultValue={data[0]}
                textError="lỗi"
                addTop={64}
            />
        </View>
    );
}
export default HomeScreen;