import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

const HomeScreen = () => {
    const router = useRouter();
    return (
        <View>
            <Text>Home tab screen</Text>
        </View>
    );
}
export default HomeScreen;