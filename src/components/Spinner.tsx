import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

export type SpinnerContextType = {
  showSpinner: (isShow: boolean, label?: string) => void;
};
export const SpinnerContext = createContext<SpinnerContextType>({
  showSpinner: () => {},
});

export const useSpinner = () => useContext(SpinnerContext);

export default function SpinnerProvider({children}: PropsWithChildren) {
  const [isShow, setIsShow] = useState(false);
  const [label, setLabel] = useState<string | undefined>();

  const showSpinner = (isShow: boolean, label?: string) => {
    setIsShow(isShow);
    setLabel(label);
  };

  return (
    <SpinnerContext.Provider
      value={{
        showSpinner,
      }}>
      {children}

      {isShow && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator style={styles.spinner} size={'large'} />
          {!!label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
    </SpinnerContext.Provider>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#0005',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  spinner: {},
  label: {
    textAlign: 'center',
    color: 'white',
  },
});
