import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useLocalSearchParams } from 'expo-router';
import VcDrawerContent from '../../components/drawercontent';
import { APP_COLOR } from '@/utils/constant';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const LayoutDrawer = () => {
    const res = useLocalSearchParams();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(progs) => (<VcDrawerContent params={res} {...progs} />)}
                screenOptions={{
                    drawerActiveTintColor: APP_COLOR.SECOND_TEXT,
                    drawerActiveBackgroundColor: APP_COLOR.SECOND1,
                    drawerStyle: {
                        width: 280
                    },
                    headerStyle: {
                        backgroundColor: APP_COLOR.PRIMARY2
                    },
                    headerTintColor: "#fff",
                    drawerItemStyle: {
                        borderRadius: 15,
                    }
                }}
            >
                <Drawer.Screen
                    name="index" // This is the name of the page and must match the url from root
                    options={{
                        title: 'Trang chủ',
                        drawerIcon: ({ focused, size, color }) => (
                            <Entypo name="home" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="menupublic" // This is the name of the page and must match the url from root
                    options={{
                        title: 'Menu chung',
                        drawerIcon: ({ focused, size, color }) => (
                            <Ionicons name="document" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="business" // This is the name of the page and must match the url from root
                    options={{
                        title: 'Kinh doanh',
                        drawerIcon: ({ focused, size, color }) => (
                            <Ionicons name="business-sharp" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="deployment" // This is the name of the page and must match the url from root
                    options={{
                        title: 'Triển khai',
                        drawerIcon: ({ focused, size, color }) => (
                            <Ionicons name="logo-codepen" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="infotech" // This is the name of the page and must match the url from root
                    options={{
                        title: 'Lập trình',
                        drawerIcon: ({ focused, size, color }) => (
                            <Ionicons name="code-working-sharp" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="report" // This is the name of the page and must match the url from root
                    options={{
                        title: 'Báo cáo',
                        drawerIcon: ({ focused, size, color }) => (
                            <Ionicons name="bar-chart" size={size} color={color} />
                        )
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
export default LayoutDrawer;