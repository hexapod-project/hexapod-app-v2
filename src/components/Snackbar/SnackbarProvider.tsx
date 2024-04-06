import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';
import {ExtendedTheme} from '../../theme';

export type SnackbarType = 'info' | 'warning' | 'error' | 'success';

export type SnackbarProps = {
  message: string;
  type?: SnackbarType;
};

export type SnackbarContextType = {
  showSnackbar: (props: SnackbarProps) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarProvider({children}: PropsWithChildren) {
  const theme: ExtendedTheme = useTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('info');

  const onDismissHandler = () => {
    setVisible(false);
  };

  const showSnackbar = ({message, type = 'info'}: SnackbarProps) => {
    setMessage(message);
    setVisible(true);
    setType(type);
  };

  const backgroundColor = useMemo(() => {
    switch (type) {
      case 'error':
        return theme.colors.errorContainer;
      case 'info':
        return theme.colors.onSurfaceVariant;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
    }
  }, [type]);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}>
      {children}
      <Snackbar
        style={{backgroundColor}}
        visible={visible}
        onDismiss={onDismissHandler}
        onIconPress={onDismissHandler}
        icon={'close'}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
