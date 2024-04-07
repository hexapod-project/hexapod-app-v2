import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {BODY_SIZE, LEG_WIDTH, LEG_X} from './constants';
import Leg from './Leg';
import Body from './Body';

export type JointSelectorProps = {
  activeJoint?: number;
  onJointSelected?: (index: number) => void;
};

export default function JointSelector({
  activeJoint = 1,
  onJointSelected,
}: JointSelectorProps) {
  const _onJointSelected = (index: number) => {
    if (onJointSelected) {
      onJointSelected(index);
    }
  };

  return (
    <View style={style.container}>
      <Leg
        style={style.legLeftFront}
        onSetActive={index => _onJointSelected(index)}
        isActive={activeJoint <= 2}
      />
      <Leg
        style={style.legLeftMid}
        onSetActive={index => _onJointSelected(index + 3)}
        isActive={activeJoint >= 3 && activeJoint <= 5}
      />
      <Leg
        style={style.legLeftBack}
        onSetActive={index => _onJointSelected(index + 6)}
        isActive={activeJoint >= 6 && activeJoint <= 8}
      />

      <Body />

      <Leg
        style={style.legRightFront}
        onSetActive={index => _onJointSelected(index + 9)}
        isActive={activeJoint >= 9 && activeJoint <= 11}
      />
      <Leg
        style={style.legRightMid}
        onSetActive={index => _onJointSelected(index + 12)}
        isActive={activeJoint >= 12 && activeJoint <= 14}
      />
      <Leg
        style={style.legRightBack}
        onSetActive={index => _onJointSelected(index + 15)}
        isActive={activeJoint >= 15 && activeJoint <= 17}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: BODY_SIZE + LEG_WIDTH * 2,
    aspectRatio: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legRightFront: {
    transform: [{rotate: '-60deg'}, {translateX: LEG_X}],
  },
  legRightMid: {
    transform: [{rotate: '0deg'}, {translateX: LEG_X}],
  },
  legRightBack: {
    transform: [{rotate: '60deg'}, {translateX: LEG_X}],
  },
  legLeftFront: {
    transform: [{rotate: '60deg'}, {scaleX: -1}, {translateX: LEG_X}],
  },
  legLeftMid: {
    transform: [{rotate: '0deg'}, {scaleX: -1}, {translateX: LEG_X}],
  },
  legLeftBack: {
    transform: [{rotate: '-60deg'}, {scaleX: -1}, {translateX: LEG_X}],
  },
});
