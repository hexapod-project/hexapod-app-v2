import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export default function BLEListEmptyComponent({
  isScanning,
}: {
  isScanning?: boolean;
}) {
  return (
    <View style={styles.emptyContainer}>
      <Text>{isScanning ? 'Scanning...' : 'No hexapods found.'} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
