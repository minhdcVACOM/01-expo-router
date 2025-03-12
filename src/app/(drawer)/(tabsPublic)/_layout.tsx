import VcTabBar from "@/components/vcTabBar";
import { Tabs } from "expo-router"
const MenuPublicLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => {
                const iconNames = ["network-wired", "book", "th-list"];
                // @ts-ignore:next-line
                return (<VcTabBar iconNames={iconNames} {...props} />);
            }}
        >
            <Tabs.Screen name="index" options={{ title: "Menu chung" }} />
            <Tabs.Screen name="menuPublicDoc" options={{ title: "Tài liệu" }} />
            <Tabs.Screen name="menuPublicList" options={{ title: "Danh mục" }} />
        </Tabs >
    )
}
export default MenuPublicLayout;