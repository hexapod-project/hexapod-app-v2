import deepmerge from 'deepmerge';
import {StyleSheet, View} from 'react-native';
import {IconButton, IconButtonProps, Text, useTheme} from 'react-native-paper';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';

const ICON_SIZE = 40;

export type RotatePadProps = {
  name?: string;
  buttonSize?: number;
};

function RotatePadButton(props: IconButtonProps) {
  const theme = useTheme();

  return (
    <IconButton
      {...props}
      style={[style.iconButton, props.style]}
      iconColor={theme.colors.onBackground}
    />
  );
}

export default function RotatePad({
  name,
  buttonSize = ICON_SIZE,
  ...props
}: RotatePadProps & ViewProps) {
  return (
    <View {...props}>
      <View style={style.container}>
        <RotatePadButton
          onPressIn={() => console.log('Left')}
          icon={'rotate-left'}
          size={buttonSize}
        />

        <RotatePadButton
          onPressIn={() => console.log('Right')}
          icon={'rotate-right'}
          size={buttonSize}
        />
      </View>

      {name && <Text style={style.label}>{name}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,    
  },
  label: {
    textAlign: 'center',
  },
  iconButton: {
    margin: 0,
  },
});
