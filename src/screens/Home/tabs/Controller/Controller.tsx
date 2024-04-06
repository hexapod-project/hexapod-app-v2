import {StyleSheet, View} from 'react-native';
import RollPitchJoystick from './components/RollPitchJoystick';
import MoveDPad from './components/MoveDPad';
import RotatePad from './components/RotatePad';

export default function Controller() {
  return (
    <View style={style.controllerContainer}>
      <MoveDPad name={'Move'} buttonSize={80} />

      <View style={style.bottomClusterContainer}>
        <RollPitchJoystick name={'Roll & Pitch'} />

        <RotatePad name={'Rotate'} buttonSize={50} />
      </View>
    </View>
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
