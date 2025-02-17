import { Stack } from "expo-router";

const AppRoot = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Detail", headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
            <Stack.Screen name="(auth)/signup" options={{ title: "Signup", headerShown: false }} />
        </Stack>
    );
}
export default AppRoot;