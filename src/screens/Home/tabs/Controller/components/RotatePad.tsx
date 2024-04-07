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

  const onPress = (rotateDirection: ROTATE_DIRECTION) => {
    bleService.writeCharacteristicWithoutResponse(
      MOTION_SERVICE_UUID,
      ROTATE_CHARACTERISTIC_UUID,
      base64.encode(rotateDirection.toString()),
    );
  };

  return (
    <View {...props}>
      <View style={style.container}>
        <RotatePadButton
          onPressIn={() => onPress(ROTATE_DIRECTION.ROTATE_LEFT)}
          onPressOut={() => onPress(ROTATE_DIRECTION.STOP)}
          icon={'rotate-left'}
          size={buttonSize}
        />

        <RotatePadButton
          onPressIn={() => onPress(ROTATE_DIRECTION.ROTATE_RIGHT)}
          onPressOut={() => onPress(ROTATE_DIRECTION.STOP)}
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
    flexGrow: 1,
  },
  label: {
    textAlign: 'center',
  },
  iconButton: {
    margin: 0,
  },
});
