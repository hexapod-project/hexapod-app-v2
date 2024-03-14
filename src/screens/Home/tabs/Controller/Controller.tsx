import {StyleSheet, View} from 'react-native';
import Joystick from './components/Joystick';
import DPad from './components/DPad';
import RotatePad from './components/RotatePad';

export default function Controller() {
  return (
    <View style={style.controllerContainer}>
      <DPad name={'Move'} buttonSize={80} />

      <View style={style.bottomClusterContainer}>
        <Joystick name={'Roll & Pitch'} />

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
