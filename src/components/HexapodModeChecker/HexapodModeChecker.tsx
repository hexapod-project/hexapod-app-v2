import {PropsWithChildren, useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useBLEService} from '../BLEServiceProvider/BLEServiceProvider';
import {HEXAPOD_MODE} from '../../enums/Hexapod.enum';
import {useFocusEffect} from '@react-navigation/native';
import {
  HEXAPOD_MODE_CHARACTERISTIC,
  HEXAPOD_SERVICE_UUID,
} from '../../constants/BLE.constants';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import {useSpinner} from '../Spinner';
import {Button, Text} from 'react-native-paper';
import base64 from 'react-native-base64';
import {useHexapodModeChecker} from './HexapodModeCheckerProvider';

export type HexapodModeCheckerProps = {
  requiredMode: HEXAPOD_MODE;
};

export default function HexapodModeChecker({
  requiredMode,
  children,
  ...viewProps
}: HexapodModeCheckerProps & PropsWithChildren & ViewProps) {
  const {showSpinner} = useSpinner();
  const {checkMode, mode} = useHexapodModeChecker();

  const bleService = useBLEService();

  useFocusEffect(
    useCallback(() => {
      if (mode != requiredMode && bleService.isConnected) {
        checkMode();
      }
    }, [mode, bleService.isConnected]),
  );

  const onSwitchPress = async () => {
    showSpinner(true, 'Switching mode...');

    try {
      await bleService.writeCharacteristicWithResponse(
        HEXAPOD_SERVICE_UUID,
        HEXAPOD_MODE_CHARACTERISTIC,
        base64.encode(requiredMode.toString()),
      );

      await checkMode();
    } finally {
      showSpinner(false);
    }
  };

  return (
    <View {...viewProps}>
      {children}
      {mode != requiredMode && (
        <View style={styles.blocker}>
          {bleService.isConnected ? (
            <Button mode="contained" onPress={onSwitchPress}>
              Switch to {HEXAPOD_MODE[requiredMode]} Mode
            </Button>
          ) : (
            <Text style={styles.text}>Connect to a Hexapod to start.</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blocker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#0006',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
