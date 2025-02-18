import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';

const AppRoot = () => {
    return (
        <RootSiblingParent>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Detail", headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
                <Stack.Screen name="(auth)/signup" options={{ title: "Signup", headerShown: false }} />
            </Stack>
        </RootSiblingParent>
    );
}
export default AppRoot;