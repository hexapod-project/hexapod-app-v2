import deepmerge from 'deepmerge';
import {StyleSheet, View} from 'react-native';
import {IconButton, IconButtonProps, Text, useTheme} from 'react-native-paper';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import {useBLEService} from '../../../../../components/BLEServiceProvider/BLEServiceProvider';
import {
  MOTION_SERVICE_UUID,
  ROTATE_CHARACTERISTIC_UUID,
} from '../../../../../constants/BLE.constants';
import {ROTATE_DIRECTION} from '../../../../../enums/Controller.enums';
import base64 from 'react-native-base64';
import {useCallback, useRef} from 'react';
import {ON_PRESSOUT_TIMEOUT} from '../../../../../constants/Controller.constants';
import {useRestButton} from './RestButton/RestButtonProvider';

const ICON_SIZE = 40;

export type RotatePadProps = {
  name?: string;
  buttonSize?: number;
};

function RotatePadButton(props: IconButtonProps) {
  const theme = useTheme();

  return (
    <IconButton
      {...props}
      style={[style.iconButton, props.style]}
      iconColor={theme.colors.onBackground}
    />
  );
}

export default function RotatePad({
  name,
  buttonSize = ICON_SIZE,
  ...props
}: RotatePadProps & ViewProps) {
  const bleService = useBLEService();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {isRest, checkIsRest} = useRestButton();

  const onPress = useCallback(
    (rotateDirection: ROTATE_DIRECTION) => {
      bleService.writeCharacteristicWithoutResponse(
        MOTION_SERVICE_UUID,
        ROTATE_CHARACTERISTIC_UUID,
        base64.encode(rotateDirection.toString()),
      );
    },
    [bleService.isConnected, timeoutRef.current],
  );

  const onPressOut = () => {
    timeoutRef.current = setTimeout(() => {
      bleService.writeCharacteristicWithResponse(
        MOTION_SERVICE_UUID,
        ROTATE_CHARACTERISTIC_UUID,
        base64.encode(ROTATE_DIRECTION.STOP.toString()),
      );
    }, ON_PRESSOUT_TIMEOUT);
  };

  return (
    <View {...props}>
      <View style={style.container}>
        <RotatePadButton
          onPressIn={() => onPress(ROTATE_DIRECTION.ROTATE_LEFT)}
          onPressOut={onPressOut}
          icon={'rotate-left'}
          size={buttonSize}
        />

        <RotatePadButton
          onPressIn={() => onPress(ROTATE_DIRECTION.ROTATE_RIGHT)}
          onPressOut={onPressOut}
          icon={'rotate-right'}
          size={buttonSize}
        />
      </View>

      {name && <Text style={style.label}>{name}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
  iconButton: {
    margin: 0,
  },
});
