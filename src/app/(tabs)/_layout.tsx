import { Tabs } from "expo-router";

const LayoutTab = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="setting" />
        </Tabs>
    );
}
export default LayoutTab;