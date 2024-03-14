import {Dimensions, StyleSheet, View} from 'react-native';
import RadialSlider from '../../../../../components/RadialSlider';
import {Button, useTheme} from 'react-native-paper';
import {useEffect, useRef, useState} from 'react';

export default function PWMPeriodCalibrator() {
  const theme = useTheme();
  const viewRef = useRef<View>(null);

  return (
    <View ref={viewRef} style={style.container}>
      <RadialSlider
        style={style.radialSlider}
        minAngle={0}
        maxAngle={270}
        rotate={135}
      />

      <Button
        mode="contained"
        style={style.button}
        buttonColor={theme.colors.primary}
        onPress={() => {}}>
        Calibrate
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    gap: 10,
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  radialSlider: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {},
});
