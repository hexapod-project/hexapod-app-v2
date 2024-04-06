import {useEffect, useState} from 'react';
import {
  StyleSheet,  
  View,
  ViewProps,
} from 'react-native';
import {G, Svg} from 'react-native-svg';
import {useTheme} from 'react-native-paper';

import {BUTTON_WIDTH, LEG_HEIGHT, LEG_WIDTH} from './constants';
import StyledPath from './StyledPath';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type JointProps = {
  isActive?: boolean;
};

type LegProps = {
  isActive?: boolean;
  onSetActive?: (index:number) => void;
};

function Coxa({isActive}: JointProps) {
  const theme = useTheme();

  return (
    <G>
      <StyledPath
        d={
          'm 1.3631703,4.9383665 c 6.8004214,0 13.6008427,0 20.4012637,0 1.140547,0.5383676 1.159224,3.2166065 0,3.7597195 -6.800421,0 -13.6008423,0 -20.4012637,0 -1.12356751,-0.322579 -1.14741931,-3.4210491 0,-3.7597195 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />

      <StyledPath
        d={
          'm 2.2175485,9.433569 c 5.9755218,0.02268 11.9555805,-0.04538 17.9282655,0.03404 1.910644,0.5027993 1.210401,2.745295 1.341858,4.196404 -0.07669,2.211941 0.160376,4.463598 -0.131742,6.648567 -0.859442,1.629724 -2.935233,0.836824 -4.417315,1.025819 -5.019698,-0.02267 -10.0439305,0.04537 -15.0607925,-0.03404 -1.91064407,-0.502799 -1.21040147,-2.745295 -1.34185837,-4.196404 0.076686,-2.21194 -0.1603763,-4.463598 0.1317416,-6.648567 C 0.91819233,9.8465673 1.5551973,9.424366 2.2175485,9.433569 Z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />

      <StyledPath
        d={
          'm 19.106356,8.026287 c -7.615645,-0.4446205 -9.9670338,11.376035 -2.760794,13.87956 3.237483,1.782143 6.356633,-0.637663 8.807232,-2.09359 4.164767,-0.03122 8.335797,0.06286 12.496594,-0.04778 2.189714,-0.428485 1.897853,-2.858511 1.883138,-4.542364 -0.06838,-1.604229 0.443686,-3.793814 -1.439623,-4.572461 -2.495423,-0.391945 -5.078429,-0.08986 -7.611035,-0.184888 -1.989551,0 -3.979102,0 -5.968653,0 C 23.169914,8.927737 21.147629,8.015693 19.106356,8.026287 Z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />
    </G>
  );
}

function Femur({isActive}: JointProps) {
  const theme = useTheme();

  return (
    <G>
      <StyledPath
        d={
          'm 27.616617,0.55539453 c 8.620672,0 17.241343,0 25.862015,0 1.140547,0.53836747 1.159224,3.21660607 0,3.75971907 -8.620672,0 -17.241343,0 -25.862015,0 -1.123567,-0.3225789 -1.147419,-3.42104877 0,-3.75971907 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />

      <StyledPath
        d={
          'm 36.910708,6.5917235 c -0.02268,5.9755215 0.04538,11.9555795 -0.03405,17.9282655 -0.502799,1.910643 -2.745295,1.210401 -4.196404,1.341858 -2.21194,-0.07669 -4.463597,0.160376 -6.648567,-0.131742 -1.629724,-0.859443 -0.836825,-2.935233 -1.025819,-4.417315 0.02267,-5.019698 -0.04537,-10.04393 0.03405,-15.0607925 0.502799,-1.9106437 2.745294,-1.2104015 4.196403,-1.3418583 2.211941,0.076686 4.463598,-0.1603763 6.648568,0.1317416 0.61282,0.2504865 1.035022,0.8874913 1.025819,1.5498427 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />
      <StyledPath
        d={
          'm 27.616617,26.499728 c 8.620672,0 17.241343,0 25.862015,0 1.140547,0.538367 1.159224,3.216606 0,3.759719 -8.620672,0 -17.241343,0 -25.862015,0 -1.123567,-0.322579 -1.147419,-3.421049 0,-3.759719 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />
    </G>
  );
}

function Tibia({isActive}: JointProps) {
  const theme = useTheme();

  return (
    <G>
      <StyledPath
        d={
          'm 56.21739,6.5917235 c -0.02268,5.9755215 0.04538,11.9555795 -0.03404,17.9282655 -0.502799,1.910644 -2.745295,1.210401 -4.196404,1.341858 -2.21194,-0.07669 -4.463598,0.160376 -6.648567,-0.131742 -1.629724,-0.859443 -0.836824,-2.935233 -1.025819,-4.417315 0.02267,-5.019698 -0.04537,-10.04393 0.03404,-15.0607925 0.502799,-1.9106439 2.745295,-1.2104014 4.196404,-1.3418583 2.21194,0.076686 4.463598,-0.1603763 6.648567,0.1317416 0.612821,0.2504866 1.035022,0.8874915 1.025819,1.5498427 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />

      <StyledPath
        d={
          'm 43.997133,8.980206 c 6.567283,0.02963 13.140502,-0.05951 19.704043,0.04499 2.182652,0.4573153 1.74467,2.906823 1.77325,4.566765 -0.09473,2.369074 0.202662,4.787907 -0.174095,7.121661 -0.933033,1.9838 -3.338489,1.193441 -5.074876,1.355608 -5.558364,-0.0295 -11.122642,0.05933 -16.677266,-0.04499 -2.182652,-0.457315 -1.74467,-2.906823 -1.77325,-4.566765 0.09473,-2.369074 -0.202662,-4.787907 0.174095,-7.121661 0.331015,-0.8098347 1.172809,-1.36777 2.048099,-1.355608 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />

      <StyledPath
        d={
          'm 67.207053,13.139231 c 1.871735,0.05133 3.766177,-0.105727 5.622817,0.08414 1.054022,0.887256 0.425411,2.471809 0.596772,3.697984 0.05484,1.725498 -1.94179,1.173282 -3.049217,1.259483 -1.277589,-0.132005 -2.718648,0.307834 -3.862739,-0.313863 -0.549099,-1.109583 -0.176647,-2.441538 -0.285897,-3.653789 -0.01666,-0.536685 0.415303,-1.083317 0.978264,-1.073952 z'
        }
        fillColor={isActive ? theme.colors.tertiary : undefined}
      />
    </G>
  );
}

export default function Leg({
  isActive,
  onSetActive,
  ...props
}: ViewProps & LegProps) {
  const [activeJoint, setActiveJoint] = useState(0);

  const toggleJoint = (index: number) => {
    if (activeJoint == index) {
      setActiveJoint(-1);
    } else {
      setActiveJoint(index);
    }

    if (onSetActive) {
      onSetActive(index);
    }
  };

  useEffect(() => {
    if (!isActive) {
      setActiveJoint(-1);
    }
  }, [isActive]);

  return (
    <View {...props} style={[style.leg, props.style]}>
      <Svg viewBox="0 0 74 31">
        <Tibia isActive={isActive && activeJoint == 2} />

        <Femur isActive={isActive && activeJoint == 1} />

        <Coxa isActive={isActive && activeJoint == 0} />
      </Svg>

      <TouchableWithoutFeedback
        style={[style.jointBtn, style.coxaBtn]}
        onPress={() => toggleJoint(0)}
      />

      <TouchableWithoutFeedback
        style={[style.jointBtn, style.femurBtn]}
        onPress={() => toggleJoint(1)}
      />

      <TouchableWithoutFeedback
        style={[style.jointBtn, style.tibiaBtn]}
        onPress={() => toggleJoint(2)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  leg: {
    width: LEG_WIDTH,
    height: LEG_HEIGHT,
    position: 'absolute',
  },
  jointBtn: {
    position: 'absolute',
    height: LEG_HEIGHT,
    bottom: 0,
  },
  coxaBtn: {
    width: BUTTON_WIDTH,
    left: 0,
  },
  femurBtn: {
    width: BUTTON_WIDTH,
    left: BUTTON_WIDTH,
  },
  tibiaBtn: {
    width: BUTTON_WIDTH,
    left: BUTTON_WIDTH * 2,
  },
});
