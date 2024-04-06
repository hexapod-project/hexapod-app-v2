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
        onSetActive={index => _onJointSelected(index + 1)}
        isActive={activeJoint <= 3}
      />
      <Leg
        style={style.legLeftMid}
        onSetActive={index => _onJointSelected(index + 4)}
        isActive={activeJoint >= 4 && activeJoint <= 6}
      />
      <Leg
        style={style.legLeftBack}
        onSetActive={index => _onJointSelected(index + 7)}
        isActive={activeJoint >= 7 && activeJoint <= 9}
      />

      <Body />

      <Leg
        style={style.legRightFront}
        onSetActive={index => _onJointSelected(index + 10)}
        isActive={activeJoint >= 10 && activeJoint <= 12}
      />
      <Leg
        style={style.legRightMid}
        onSetActive={index => _onJointSelected(index + 13)}
        isActive={activeJoint >= 13 && activeJoint <= 15}
      />
      <Leg
        style={style.legRightBack}
        onSetActive={() => _onJointSelected(16)}
        isActive={activeJoint >= 16 && activeJoint <= 18}
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
