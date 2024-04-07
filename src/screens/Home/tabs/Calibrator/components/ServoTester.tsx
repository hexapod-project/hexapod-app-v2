import {CircleSlider} from '@edw-lee/react-native-circle-slider';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import {clamp, map} from '../../../../../utils/number.utils';
import {
  MAX_SERVO_ANGLE,
  MIN_SERVO_ANGLE,
} from '../../../../../constants/Calibrator.constants';
import {useBLEService} from '../../../../../components/BLEServiceProvider/BLEServiceProvider';
import {
  CALIBRATE_SERVICE_UUID,
  MOVE_SERVO_CHARACTERISTIC_UUID,
} from '../../../../../constants/BLE.constants';
import {joinByteArrays, numberToBytes} from '../../../../../utils/byte.util';
import base64 from 'react-native-base64';

const OFFSET_ANGLE = 15;
const MAX_ANGLE = 150;
const SLIDER_SIZE = 70;

export type ServoTesterProps = {
  activeJoint: number;
};

export default function ServoTester({activeJoint}: ServoTesterProps) {
  const theme = useTheme();
  const [angle, setAngle] = useState(MAX_ANGLE / 2);
  const [height, setHeight] = useState(0);
  const bleService = useBLEService();

  const onCircleSliderUpdate = (newAngle: number) => {
    setAngle(newAngle);
  };

  const onLayoutHandler = (e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;

    const halfWidth = width / 2;

    setTimeout(() => {
      setHeight(halfWidth);
    }, 200);
  };

  const displayAngle = useMemo(
    () =>
      Math.round(map(angle, 0, MAX_ANGLE, MIN_SERVO_ANGLE, MAX_SERVO_ANGLE)),
    [angle],
  );

  const onAngleButtonPress = useCallback(
    (increment: number) => {
      let newAngle = map(
        displayAngle + increment,
        MIN_SERVO_ANGLE,
        MAX_SERVO_ANGLE,
        0,
        MAX_ANGLE,
      );

      newAngle = clamp(newAngle, 0, MAX_ANGLE);

      setAngle(newAngle);
    },
    [displayAngle],
  );

  const onMovePress = useCallback(() => {
    const angleBytes = numberToBytes(displayAngle - MIN_SERVO_ANGLE);
    const activeJointByte = numberToBytes(activeJoint);
    const bytes = joinByteArrays(activeJointByte, angleBytes);

    bleService.writeCharacteristicWithoutResponse(
      CALIBRATE_SERVICE_UUID,
      MOVE_SERVO_CHARACTERISTIC_UUID,
      base64.encodeFromByteArray(bytes),
    );
  }, [activeJoint, displayAngle]);

  return (
    <View style={styles.container}>
      <CircleSlider
        style={[styles.circleSlider, {height, opacity: height ? 1 : 0}]}
        sliderAngle={angle}
        offsetAngle={OFFSET_ANGLE}
        maxAngle={MAX_ANGLE}
        size={SLIDER_SIZE}
        color={theme.colors.tertiary}
        onUpdate={onCircleSliderUpdate}
        onLayout={onLayoutHandler}
      />

      <View style={styles.displayAngleContainer}>
        <IconButton
          style={styles.button}
          icon={'minus-circle'}
          size={40}
          onPress={() => onAngleButtonPress(-1)}
        />

        <Text style={styles.displayAngle}>{displayAngle}°</Text>

        <IconButton
          style={styles.button}
          icon={'plus-circle'}
          size={40}
          onPress={() => onAngleButtonPress(1)}
        />
      </View>

      <Button
        style={styles.button}
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={onMovePress}>
        Move
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSlider: {
    width: '80%',
  },
  displayAngleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayAngle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 40,
    margin: 0,
    minWidth: 100,
  },
  button: {
    margin: 0,
  },
});
