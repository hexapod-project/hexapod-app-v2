import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {CircleSlider} from '@edw-lee/react-native-circle-slider';
import {clamp, map} from '../../../../../utils/number.utils';
import {
  MAX_PWM_PERIOD,
  MIN_PWM_PERIOD,
} from '../../../../../constants/Calibrator.constants';
import {degToRad} from '../../../../../utils/geometry.util';
import {useBLEService} from '../../../../../components/BLEServiceProvider/BLEServiceProvider';
import {
  CALIBRATE_SERVICE_UUID,
  PWM_PULSE_CHARACTERISTIC_UUID,
} from '../../../../../constants/BLE.constants';
import {
  bytesToNumber,
  joinByteArrays,
  numberToBytes,
  stringToBytes,
} from '../../../../../utils/byte.util';
import base64 from 'react-native-base64';
import {useSpinner} from '../../../../../components/Spinner';
import {useSnackbar} from '../../../../../components/Snackbar';

const OFFSET_ANGLE = -45;
const MAX_ANGLE = 270;
const SLIDER_SIZE = 50;

export type PWMPeriodCalibratorProps = {
  activeJoint: number;
};

export default function PWMPulseCalibrator({
  activeJoint,
}: PWMPeriodCalibratorProps) {
  const theme = useTheme();
  const {showSpinner} = useSpinner();
  const {showSnackbar} = useSnackbar();
  const bleService = useBLEService();

  const [angle, setAngle] = useState(MAX_ANGLE / 2);
  const [height, setHeight] = useState(0);
  const [heigthOffset, setHeightOffset] = useState(0);
  const [pwmPulses, setPWMPulses] = useState<number[] | undefined>(undefined);

  const onCircleSliderUpdate = (_angle: number) => {
    setAngle(_angle);
  };

  const onLayoutHandler = (e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;

    const sliderRadius = SLIDER_SIZE / 2;
    const halfWidth = width / 2;
    let otherHalfHeight = Math.abs(
      Math.sin(degToRad(MAX_ANGLE + OFFSET_ANGLE)) * (halfWidth - sliderRadius),
    );

    const newHeight = halfWidth + otherHalfHeight + sliderRadius;

    setHeight(newHeight);
    setHeightOffset(width - newHeight);
  };

  const pwm = useMemo(
    () => Math.round(map(angle, 0, MAX_ANGLE, MIN_PWM_PERIOD, MAX_PWM_PERIOD)),
    [angle],
  );

  const onPWMButtonPress = useCallback(
    (increment: number) => {
      let newAngle = map(
        pwm + increment,
        MIN_PWM_PERIOD,
        MAX_PWM_PERIOD,
        0,
        MAX_ANGLE,
      );

      newAngle = clamp(newAngle, 0, MAX_ANGLE);

      setAngle(newAngle);
    },
    [pwm],
  );

  const onCalibratePress = useCallback(async () => {
    const pwmBytes = numberToBytes(pwm);
    const activeJointByte = numberToBytes(activeJoint);

    const bytes = joinByteArrays(activeJointByte, pwmBytes);

    await bleService.writeCharacteristicWithResponse(
      CALIBRATE_SERVICE_UUID,
      PWM_PULSE_CHARACTERISTIC_UUID,
      base64.encodeFromByteArray(bytes),
    );

    if (pwmPulses?.at(activeJoint)) {
      pwmPulses[activeJoint] = pwm;
      setPWMPulses(pwmPulses.slice());
    }
    
    showSnackbar({message: 'Calibrated successfully.', type: 'success'});
  }, [bleService.isConnected, pwm, activeJoint, pwmPulses]);

  const retrieveCalibrationSettings = async () => {
    try {
      showSpinner(true, 'Retrieving calibration settings...');
      const characteristic = await bleService.readCharacteristic(
        CALIBRATE_SERVICE_UUID,
        PWM_PULSE_CHARACTERISTIC_UUID,
      );

      const value = characteristic?.value
        ? base64.decode(characteristic.value)
        : undefined;

      if (value) {
        const pwmPulses = bytesToNumber(stringToBytes(value));
        setPWMPulses(pwmPulses);
      }
    } catch (error) {
    } finally {
      showSpinner(false);
    }
  };

  useEffect(() => {
    if (bleService.isConnected && !pwmPulses) {
      retrieveCalibrationSettings();
    }
  }, [bleService.isConnected, pwmPulses]);

  useEffect(() => {
    if (!!pwmPulses && pwmPulses?.length > activeJoint) {
      const pulse = pwmPulses[activeJoint];

      setAngle(map(pulse, MIN_PWM_PERIOD, MAX_PWM_PERIOD, 0, MAX_ANGLE));
    } else {
      setAngle(MAX_ANGLE / 2);
    }
  }, [activeJoint, pwmPulses]);

  return (
    <View style={styles.container}>
      <IconButton
        style={styles.refreshButton}
        icon={'refresh'}
        onPress={retrieveCalibrationSettings}
      />

      <View style={styles.circleSliderContainer}>
        <View style={[styles.pwmAmountContainer, {paddingTop: heigthOffset}]}>
          <Text style={styles.pwmAmount}>{pwm}</Text>
          <Text>ms</Text>
        </View>

        <IconButton
          style={{marginTop: heigthOffset}}
          icon={'minus-circle'}
          size={40}
          onPress={() => onPWMButtonPress(-1)}
        />

        <CircleSlider
          style={[styles.circleSlider, {height}]}
          sliderAngle={angle}
          offsetAngle={OFFSET_ANGLE}
          maxAngle={MAX_ANGLE}
          size={SLIDER_SIZE}
          color={theme.colors.tertiary}
          onUpdate={onCircleSliderUpdate}
          onLayout={onLayoutHandler}
        />

        <IconButton
          style={{marginTop: heigthOffset}}
          icon={'plus-circle'}
          size={40}
          onPress={() => onPWMButtonPress(1)}
        />
      </View>

      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={onCalibratePress}>
        Calibrate
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  circleSliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleSlider: {
    flexGrow: 1,
  },
  pwmAmountContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  pwmAmount: {
    fontWeight: '700',
    fontSize: 40,
  },
  refreshButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
