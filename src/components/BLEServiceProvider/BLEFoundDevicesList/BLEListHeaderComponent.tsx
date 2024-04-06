import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export default function BLEListHeaderComponent() {
  const theme = useTheme();

  return (
    <Text style={[styles.header, {color: theme.colors.elevation.level3}]}>
      Available Hexapods
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
