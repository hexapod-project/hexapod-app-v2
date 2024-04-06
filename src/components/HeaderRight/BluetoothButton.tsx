import {IconButton, useTheme} from 'react-native-paper';
import {State as BLEState} from 'react-native-ble-plx';
import {useMemo} from 'react';
import {useBLEService} from '../BLEServiceProvider/BLEServiceProvider';

export default function BluetoothButton() {
  const theme = useTheme();
  const bleService = useBLEService();

  const icon = useMemo(() => {
    if (bleService.isConnected) {
      return 'bluetooth-connect';
    }

    switch (bleService.bleState) {
      case BLEState.PoweredOn:
        return 'bluetooth';
      default:
        return 'bluetooth-off';
    }
  }, [bleService.bleState, bleService.isConnected]);

  return (
    <IconButton
      icon={icon}
      iconColor={theme.colors.onPrimary}
      onPress={() => bleService.init()}
    />
  );
}
