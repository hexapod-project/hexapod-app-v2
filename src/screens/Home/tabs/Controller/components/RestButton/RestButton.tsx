import {IconButton, IconButtonProps, useTheme} from 'react-native-paper';
import {useRestButton} from './RestButtonProvider';

export default function RestButton(props: Omit<IconButtonProps, 'icon'>) {
  const theme = useTheme();
  const {isRest, updateIsRest} = useRestButton();

  return (
    <IconButton
      {...props}
      mode="outlined"
      containerColor={isRest ? '#174985' : theme.colors.tertiaryContainer}
      iconColor={theme.colors.inverseOnSurface}
      icon={isRest ? 'weather-night' : 'weather-sunny'}
      size={30}
      onPress={updateIsRest}
    />
  );
}
