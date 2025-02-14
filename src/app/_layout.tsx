import { Stack } from "expo-router";

const AppRoot = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
            <Stack.Screen name="index" options={{ title: "Detail", headerShown: false }} />
        </Stack>
    );
}
export default AppRoot;