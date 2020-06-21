import React, { memo } from 'react';
import { View, Modal, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface OverlayProps {
    isVisible: Boolean,
    onClose: Function,
    animation: String,
    style: StyleProp<ViewStyle>
}

function Overlay ({ children, isVisible, onClose, animation, style }: OverlayProps) {
    
    return (
        <Modal visible={isVisible} transparent={true} animationType={animation}
            hardwareAccelerated={true} onRequestClose={() => onClose({  })} >
            <View style={styles.background} onStartShouldSetResponder={() => onClose({ })} />
            <View style={styles.container}>
                <View style={style}>{children}</View>
            </View>
        </Modal>
    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: '#000000', 
        opacity: 0.6
    },
    container: {
        position: 'absolute',
        width: "100%", 
        height: "100%", 
        justifyContent: "center"
    }    
});

export default memo(Overlay);