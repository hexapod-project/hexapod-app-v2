import {useEffect, useRef, useState} from 'react';
import {Vector} from '../types/Vector';
import {Animated, PanResponder, PanResponderCallbacks} from 'react-native';

export type UsePanResponderProps = {
  initialPosition?: Vector;
  offset?: Vector;
  config?: PanResponderCallbacks;
};

export function usePanResponder({
  initialPosition = new Vector(),
  offset = new Vector(),
  config,
}: UsePanResponderProps) {
  const [position, setPosition] = useState(
    initialPosition.add(offset).toObject(),
  );

  const pan = useRef(new Animated.ValueXY(initialPosition)).current;

  const panResponder = useRef(
    PanResponder.create({
      ...config,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
    }),
  ).current;

  useEffect(() => {
    pan.setOffset(offset);

    pan.addListener(({x, y}) => {
      setPosition({x, y});
    });

    return () => {
      pan.removeAllListeners();
    };
  }, []);

  return {
    panResponder,
    pan,
    x: position.x,
    y: position.y,
  };
}
