import deepmerge from 'deepmerge';
import {StyleSheet, View} from 'react-native';
import {IconButton, IconButtonProps, Text, useTheme} from 'react-native-paper';
import {useBLEService} from '../../../../../components/BLEServiceProvider/BLEServiceProvider';
import {
  MOTION_SERVICE_UUID,
  MOVE_CHARACTERISTIC_UUID,
} from '../../../../../constants/BLE.constants';
import {WALK_DIRECTION} from '../../../../../enums/Controller.enums';
import base64 from 'react-native-base64';
import {useCallback, useRef} from 'react';
import {ON_PRESSOUT_TIMEOUT} from '../../../../../constants/Controller.constants';

const ICON_SIZE = 40;
const ICON_PADDING = 8 * 2;

export type DPadProps = {
  name?: string;
  buttonSize?: number;
};

function DPadButton(props: IconButtonProps) {
  const theme = useTheme();

  return (
    <IconButton
      {...props}
      style={[style.iconButton, props.style]}
      iconColor={theme.colors.tertiary}
    />
  );
}

export default function MoveDPad({name, buttonSize = ICON_SIZE}: DPadProps) {
  const bleService = useBLEService();
  const iconTotalSize = buttonSize + ICON_PADDING;
  const containerSize = iconTotalSize * 2.25;
  const buttonOffset = containerSize / 2 - iconTotalSize / 2;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onPressIn = useCallback(
    (walkDirection: WALK_DIRECTION) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      bleService.writeCharacteristicWithoutResponse(
        MOTION_SERVICE_UUID,
        MOVE_CHARACTERISTIC_UUID,
        base64.encode(walkDirection.toString()),
      );
    },
    [bleService.isConnected, timeoutRef.current],
  );

  const onPressOut = () => {
    timeoutRef.current = setTimeout(() => {
      bleService.writeCharacteristicWithResponse(
        MOTION_SERVICE_UUID,
        MOVE_CHARACTERISTIC_UUID,
        base64.encode(WALK_DIRECTION.STOP.toString()),
      );
    }, ON_PRESSOUT_TIMEOUT);
  };

  return (
    <View>
      <View
        style={[
          style.container,
          {width: containerSize, height: containerSize},
        ]}>
        <DPadButton
          style={[style.up, {left: buttonOffset}]}
          onPressIn={() => onPressIn(WALK_DIRECTION.FORWARD)}
          onPressOut={onPressOut}
          icon={'arrow-up-bold-circle'}
          size={buttonSize}
        />

        <DPadButton
          style={[style.down, {left: buttonOffset}]}
          onPressIn={() => onPressIn(WALK_DIRECTION.BACKWARD)}
          onPressOut={onPressOut}
          icon={'arrow-down-bold-circle'}
          size={buttonSize}
        />

        <DPadButton
          style={[style.left, {top: buttonOffset}]}
          onPressIn={() => onPressIn(WALK_DIRECTION.LEFT)}
          onPressOut={onPressOut}
          icon={'arrow-left-bold-circle'}
          size={buttonSize}
        />

        <DPadButton
          style={[style.right, {top: buttonOffset}]}
          onPressIn={() => onPressIn(WALK_DIRECTION.RIGHT)}
          onPressOut={onPressOut}
          icon={'arrow-right-bold-circle'}
          size={buttonSize}
        />
      </View>

      {name && <Text style={style.label}>{name}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    textAlign: 'center',
  },
  iconButton: {
    position: 'absolute',
    margin: 0,
  },
  up: {
    top: 0,
  },
  down: {
    bottom: 0,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});
