import {PanResponder, StyleSheet, View} from 'react-native';
import {Icon, MD3Theme, Text, useTheme} from 'react-native-paper';
import {Circle, Svg} from 'react-native-svg';
import {Animated} from 'react-native';
import {useEffect, useRef} from 'react';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import {usePanResponder} from '../../../../../hooks/usePanResponder';
import {Vector} from '../../../../../types/Vector';

const JOYSTICK_SIZE = 50;
const JOYSTICK_RADIUS = JOYSTICK_SIZE / 2;
const CONTAINER_SIZE = 100;
const CONTAINER_RADIUS = CONTAINER_SIZE / 2;
const VIEW_SIZE = CONTAINER_SIZE + JOYSTICK_SIZE;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type JoystickProps = {
  name?: string;
};

export default function Joystick({name, ...props}: JoystickProps & ViewProps) {
  const theme = useTheme();
  const style = createStyle(theme);

  const center: Vector = new Vector({
    x: VIEW_SIZE / 2,
    y: VIEW_SIZE / 2,
  });

  let {panResponder, pan, x, y} = usePanResponder({
    config: {
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          useNativeDriver: false,
          toValue: {x: 0, y: 0},
        }).start();
      },
    },
  });

  const position = useRef(new Animated.ValueXY(center)).current;

  useEffect(() => {
    position.setOffset(center);
  }, []);

  useEffect(() => {
    if (x * x + y * y > CONTAINER_RADIUS * CONTAINER_RADIUS) {
      const angle = Math.atan2(y, x);
      x = Math.cos(angle) * CONTAINER_RADIUS;
      y = Math.sin(angle) * CONTAINER_RADIUS;
    }

    position.setValue({x, y});
  }, [x, y]);

  return (
    <View {...props} style={[style.joystickContainer, props.style]}>
      {name && <Text style={style.joystickLabel}>{name}</Text>}

      <Svg viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}>
        {/* Outline */}
        <Circle
          cx={VIEW_SIZE / 2}
          cy={VIEW_SIZE / 2}
          r={CONTAINER_SIZE / 2}
          fill={theme.colors.elevation.level0}
          strokeWidth={1}
          stroke={theme.colors.outline}
        />

        {/* Center point */}
        <Circle
          cx={VIEW_SIZE / 2}
          cy={VIEW_SIZE / 2}
          r={3}
          fill={theme.colors.onBackground}
          fillOpacity={0.3}
        />

        {/* Joystick */}
        <AnimatedCircle
          cx={position.x}
          cy={position.y}
          r={JOYSTICK_RADIUS - 2}
          fill={theme.colors.elevation.level3}
          {...panResponder.panHandlers}
        />
      </Svg>
    </View>
  );
}

const createStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    joystickContainer: {
      flexGrow: 1,
      aspectRatio: 1,
      position: 'relative',
    },
    joystickIcon: {
      position: 'absolute',
      opacity: 0.5,
      pointerEvents: 'none',
    },
    joystickLabel: {
      width: '100%',
      position: 'absolute',
      textAlign: 'center',
      bottom: 0,
    },
  });
