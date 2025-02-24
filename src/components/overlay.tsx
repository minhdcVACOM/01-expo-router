import { APP_COLOR } from "@/utils/constant";
import { View, StyleSheet, ActivityIndicator, ViewStyle, StyleProp } from "react-native";

interface IProps {
    style?: StyleProp<ViewStyle>;
    color?: string;
    animating?: boolean;
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0,0.2)"
    }
})
const LoadingOverlay = (props: IProps) => {
    return (
        <View style={[styles.loading, props.style]}>
            <ActivityIndicator size='large' color={props.color ?? APP_COLOR.PRIMARY2} animating={props.animating} />
        </View>
    )
}

export default LoadingOverlay;
