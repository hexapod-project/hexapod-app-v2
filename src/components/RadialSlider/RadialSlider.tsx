import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Circle, G, Path, Svg} from 'react-native-svg';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import {
  clampTo360Rad,
  degToRad,
  describeArc,
  toPositiveRad,
} from '../../utils/Geometry.util';

export const SIZE = 100;
export const RADIUS = SIZE / 2;
export const STROKE_WIDTH = 5;
export const BUTTON_RADIUS = STROKE_WIDTH * 2;
export const CENTER = RADIUS + BUTTON_RADIUS;
export const MAX_DELTA_ANGLE = degToRad(45);

export type RadialSliderProps = {
  minAngle?: number;
  maxAngle?: number;
  rotate?: number;
  onChange?: (angle: number) => void;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function RadialSlider({
  minAngle = 0,
  maxAngle = 360,
  rotate = 0,
  onChange,
  ...props
}: RadialSliderProps & ViewProps) {
  if (minAngle < 0 || maxAngle < 0) {
    throw 'minAngle and maxAngle cannot be negative.';
  }

  if (minAngle >= maxAngle) {
    throw 'minAngle cannot be more than or equal to maxAngle.';
  }

  const theme = useTheme();

  const minAngleRad = degToRad(minAngle);
  const maxAngleRad = degToRad(maxAngle);
  const rotateRad = degToRad(rotate);

  const [angle, setAngle] = useState(0);

  const buttonX = useMemo(() => {
    return Math.cos(angle) * RADIUS;
  }, [angle]);

  const buttonY = useMemo(() => {
    return Math.sin(angle) * RADIUS;
  }, [angle]);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, state) => {
        pan.extractOffset();
      },
    }),
  ).current;

  useEffect(() => {
    pan.setOffset({x: CENTER, y: CENTER});
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(angle);
    }

    pan.removeAllListeners();

    pan.addListener(({x, y}) => {
      let newAngle = Math.atan2(y, x);

      newAngle = toPositiveRad(newAngle);
      newAngle = clampTo360Rad(newAngle);

      if (Math.abs(newAngle - angle) > MAX_DELTA_ANGLE) {
        return;
      }

      newAngle = Math.max(minAngleRad, Math.min(maxAngleRad, newAngle));

      setAngle(newAngle);
    });

    return () => {
      pan.removeAllListeners();
    };
  }, [angle]);

  return (
    <View {...props}>
      <Svg
        viewBox={`0 0 ${SIZE + BUTTON_RADIUS * 2} ${SIZE + BUTTON_RADIUS * 2}`}>
        <G origin={CENTER} rotation={rotate}>
          <Path
            d={describeArc(CENTER, CENTER, RADIUS, minAngleRad, maxAngleRad)}
            fill={'transparent'}
            stroke={theme.colors.outline}
            strokeWidth={STROKE_WIDTH}
          />

          <Path
            d={describeArc(CENTER, CENTER, RADIUS, minAngleRad, angle)}
            fill={'transparent'}
            stroke={theme.colors.tertiary}
            strokeWidth={STROKE_WIDTH}
          />

          <AnimatedCircle
            origin={CENTER}            
            r={BUTTON_RADIUS}
            fill={theme.colors.tertiary}
            cx={CENTER + buttonX}
            cy={CENTER + buttonY}
            {...panResponder.panHandlers}
          />
        </G>
      </Svg>
    </View>
  );
}
