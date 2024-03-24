import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {JointSelector} from './components/JointSelector';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import PWMPeriodCalibrator from './components/PWMCalibrator';
import ServoTester from './components/ServoTester';
import {useState} from 'react';
import TabWrapper from '../../../../components/TabWrapper';

export default function Calibrator() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={style.container}>
      <View style={style.jointSelectorContainer}>
        <JointSelector />
      </View>

      <TabsProvider
        defaultIndex={currentIndex}
        onChangeIndex={index => setCurrentIndex(index)}>
        <Tabs
          theme={{
            ...theme,
            colors: {
              ...theme.colors,
              onSurface: theme.colors.primary,
            },
          }}
          disableSwipe>
          <TabScreen label="Calibrate" icon={'av-timer'}>
            <PWMPeriodCalibrator />
          </TabScreen>

          <TabScreen label="Test" icon={'angle-acute'}>
            <TabWrapper
              index={1}
              currentIndex={currentIndex}
              initializeOnshow>
              <ServoTester />
            </TabWrapper>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  jointSelectorContainer: {
    alignItems: 'center',
  },
});
