import {StyleSheet, View} from 'react-native';
import RollPitchJoystick from './components/RollPitchJoystick';
import MoveDPad from './components/MoveDPad';
import RotatePad from './components/RotatePad';
import HexapodModeChecker from '../../../../components/HexapodModeChecker/HexapodModeChecker';
import {HEXAPOD_MODE} from '../../../../enums/Hexapod.enum';

export default function Controller() {
  return (
    <HexapodModeChecker
      style={style.controllerContainer}
      requiredMode={HEXAPOD_MODE.CONTROLLER}>
      <MoveDPad name={'Move'} buttonSize={80} />

      <View style={style.bottomClusterContainer}>
        <RollPitchJoystick name={'Roll & Pitch'} />

        <RotatePad name={'Rotate'} buttonSize={50} />
      </View>
    </HexapodModeChecker>
  );
}

const style = StyleSheet.create({
  controllerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  bottomClusterContainer: {
    width: '100%',
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
