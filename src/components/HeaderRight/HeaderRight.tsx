import {StyleSheet, View} from 'react-native';
import BluetoothButton from './BluetoothButton';

export default function HeaderRight() {
  return (
    <View>
      <BluetoothButton />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
