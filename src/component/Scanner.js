import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from "react";
import {
    View,
    Text,
    Linking,
    TouchableOpacity
} from 'react-native';
import { fontStyles, palette } from "../styles";
import { Camera } from 'react-native-camera-kit';
import { BottomSheetModal } from '@gorhom/bottom-sheet/src';

const Scanner = React.forwardRef((props, ref) => {
    // variables
    const snapPoints = useMemo(() => {
        if (Platform.OS == 'ios') {
        return ['95%', '95%']
        } else if (Platform.OS == 'android') {
        return ['100%', '100%']
        }
        
    }, []);

    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={{flex: 1}}>
                <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={fontStyles.detailHeader}>Search talent by barcode</Text>
                </View>
                <View style={{ 
                    flex: 0.5, 
                    padding: 20,
                    borderRadius: 20
                }}>
                    <Camera
                        style={{ flex: 1 }}
                        showFrame={false}
                        // Show/hide scan frame
                        scanBarcode={true}
                        // Can restrict for the QR Code only
                        laserColor={'blue'}
                        // Color can be of your choice
                        frameColor={'yellow'}
                        // If frame is visible then frame color
                        colorForScannerFrame={'white'}
                        // Scanner Frame color
                        onReadCode={(event) => {
                            ref.current?.close()
                            Linking.openURL(event.nativeEvent.codeStringValue)
                        }}
                    />
                </View>
                <TouchableOpacity 
                    onPress={() => ref.current?.close()}
                    style={{ 
                        flex: 0.25, 
                        justifyContent: 'center', 
                        alignItems: 'center' ,
                    }}
                >
                    <Text style={[fontStyles.mainBody, { color: palette.accent3 }]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
})

export default memo(Scanner);