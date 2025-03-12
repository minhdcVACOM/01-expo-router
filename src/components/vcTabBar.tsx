import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import VcTabbarButton from './vcTabbarButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { APP_COLOR } from '@/utils/constant';

const VcTabBar = (progs: BottomTabBarProps) => {
    const { state, descriptors, navigation } = progs;
    const { iconNames }: any = progs;
    const [dimension, setDimension] = useState({ height: 20, width: 100 });
    const buttonWidth = dimension.width / state.routes.length;
    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimension({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        })
    }
    const tabPositionX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }]
        }
    })
    return (
        <View onLayout={onTabbarLayout} style={styles.tabbar}>
            <Animated.View style={[animatedStyle, {
                position: "absolute",
                backgroundColor: APP_COLOR.SECOND1,
                borderRadius: 30,
                marginHorizontal: 20,
                height: dimension.height - 10,
                width: buttonWidth - 40
            }]} />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 })
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <VcTabbarButton
                        _key={route.name}
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        iconName={iconNames[index]}
                        isFocused={isFocused}
                        label={(typeof label === "string") ? label : ""}
                    />
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    tabbar: {
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        marginHorizontal: 30,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 15,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { height: 0, width: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        borderWidth: 0.5,
        borderColor: APP_COLOR.PRIMARY2
    }
})
export default VcTabBar;