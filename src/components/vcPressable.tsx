import { APP_COLOR } from '@/utils/constant';
import { PlatformPressable } from '@react-navigation/elements';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
interface Iprogs {
    children: any,
    onPress?: () => void,
    pressStyle?: StyleProp<ViewStyle>
}
const VcPressable = (progs: Iprogs) => {
    const { children, pressStyle, onPress } = progs
    return (
        <PlatformPressable
            pressColor={APP_COLOR.SECOND2}
            hoverEffect={{ color: APP_COLOR.PRIMARY2 }}
            style={[{ backgroundColor: "#fff", borderRadius: 10, padding: 10 }, pressStyle]}
            onPress={onPress}
        >
            {children}
        </PlatformPressable>
    )
}
export default VcPressable;