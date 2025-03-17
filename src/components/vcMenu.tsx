import { APP_COLOR } from "@/utils/constant";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import VcLine from "./vcLine";

interface IMenu {
    id?: number | string,
    value?: string,
    icon?: ReactNode
}
interface IProgs {
    data: IMenu[],
    onSelect: (id: number | string) => void
}
const VcMenu = (progs: IProgs) => {
    const { data, onSelect } = progs;
    return (
        <Menu onSelect={value => onSelect(value)}>
            <MenuTrigger customStyles={{
                triggerOuterWrapper: {
                    flex: 1
                },
                // triggerTouchable: { borderRadius: 20 },
                triggerWrapper: { flex: 1, borderRadius: 20, justifyContent: "center" },
                // triggerText: { borderRadius: 20 }
            }}>
                <MaterialIcons name="more-vert" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsContainer: { borderRadius: 10, backgroundColor: APP_COLOR.SECOND2 } }}>
                {data.map(menu => menu.id ?
                    <MenuOption key={menu.id} value={menu.id}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            {menu.icon}
                            <Text>{menu.value}</Text>
                        </View>
                    </MenuOption>
                    : <VcLine />)}
            </MenuOptions>
        </Menu>
    );
}
export default VcMenu;