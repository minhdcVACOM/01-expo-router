import React from 'react';
import { View, StyleSheet } from 'react-native';

const VcLine = () => {
    return <View style={styles.line} />;
};

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: '#CED0CE',
        paddingHorizontal: 10
    },
});

export default VcLine;