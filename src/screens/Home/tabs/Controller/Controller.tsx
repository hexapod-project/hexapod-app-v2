import {StyleSheet, View} from 'react-native';
import Joystick from './components/Joystick';
import RotatePad from './components/RotatePad';
import HexapodModeChecker from '../../../../components/HexapodModeChecker/HexapodModeChecker';
import {HEXAPOD_MODE} from '../../../../enums/Hexapod.enum';
import {
  MOTION_SERVICE_UUID,
  MOVE_CHARACTERISTIC_UUID,
  ROLLPITCH_CHARACTERISTIC_UUID,
} from '../../../../constants/BLE.constants';
import {useBLEService} from '../../../../components/BLEServiceProvider/BLEServiceProvider';
import base64 from 'react-native-base64';
import {Text, useTheme} from 'react-native-paper';
import RestButton from './components/RestButton/RestButton';
import RestButtonProvider, {
  useRestButton,
} from './components/RestButton/RestButtonProvider';

function MoveJoystick() {
  const theme = useTheme();
  const bleService = useBLEService();
  const {isRest, checkIsRest} = useRestButton();

  const onMoveJoystickChanged = async (angle: number) => {
    bleService.writeCharacteristicWithoutResponse(
      MOTION_SERVICE_UUID,
      MOVE_CHARACTERISTIC_UUID,
      base64.encode(angle.toString()),
    );

    if (isRest) {
      checkIsRest();
    }
  };

  return (
    <Joystick
      style={{
        flex: 1,
      }}
      color={theme.colors.tertiary}
      name="Move"
      onAngleChanged={onMoveJoystickChanged}
    />
  );
}

function RollPitchJoystick() {
  const bleService = useBLEService();

  const onRollPitchJoystickChanged = async (angle: number) => {
    bleService.writeCharacteristicWithoutResponse(
      MOTION_SERVICE_UUID,
      ROLLPITCH_CHARACTERISTIC_UUID,
      base64.encode(angle.toString()),
    );
  };

  return (
    <Joystick
      name={'Roll & Pitch'}
      onAngleChanged={onRollPitchJoystickChanged}
    />
  );
}

function RestBlocker() {
  const {isRest} = useRestButton();

  if (isRest) {
    return (
      <View style={style.restBlocker}>
        <Text style={{color: 'white'}}>Hexapod is resting.</Text>
      </View>
    );
  } else {
    return null;
  }
}

export default function Controller() {
  return (
    <RestButtonProvider>
      <HexapodModeChecker requiredMode={HEXAPOD_MODE.CONTROLLER}>
        <View style={style.controllerContainer}>
          <View style={style.topButtonsContainer}>
            <RestButton style={style.restButton} />
          </View>

          <RestBlocker />

          <MoveJoystick />

          <View style={style.bottomClusterContainer}>
            <RollPitchJoystick />

            <RotatePad name={'Rotate'} buttonSize={50} />
          </View>
        </View>
      </HexapodModeChecker>
    </RestButtonProvider>
  );
}

const style = StyleSheet.create({
  controllerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gap: 20,
  },
  topButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  restButton: {
    zIndex: 2,
  },
  bottomClusterContainer: {
    width: '100%',
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  restBlocker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000a',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
