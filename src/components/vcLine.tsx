import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
interface IProgs {
    style?: StyleProp<ViewStyle>
}
const VcLine = ({ style }: IProgs) => {
    return <View style={[styles.line, style]} />;
};

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: '#CED0CE',
        paddingHorizontal: 10
    },
});

export default VcLine;