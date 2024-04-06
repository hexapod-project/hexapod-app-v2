import {Path} from 'react-native-svg';

import {FILL_COLOR_LEG, STROKE_COLOR, STROKE_OPACITY} from './constants';

export type StyledPathProps = {
  d: string;
  fillColor?: string;
};

export default function StyledPath({d, fillColor}: StyledPathProps) {
  return (
    <Path
      d={d}
      fill={fillColor ?? FILL_COLOR_LEG}
      stroke={STROKE_COLOR}
      strokeOpacity={STROKE_OPACITY}
      strokeLinejoin="round"
    />
  );
}
