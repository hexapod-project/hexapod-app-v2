import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useBLEService} from '../../../../../../components/BLEServiceProvider/BLEServiceProvider';
import {
  HEXAPOD_REST_CHARACTERISTIC,
  HEXAPOD_SERVICE_UUID,
} from '../../../../../../constants/BLE.constants';
import base64 from 'react-native-base64';
import {useSpinner} from '../../../../../../components/Spinner';
import {StyleSheet, View} from 'react-native';

export type RestButtonContextType = {
  isRest: boolean;
  checkIsRest: () => Promise<boolean>;
  updateIsRest: () => Promise<void>;
};

export const RestButtonContext = createContext<RestButtonContextType>({
  isRest: false,
  checkIsRest: async () => false,
  updateIsRest: async () => {},
});

export const useRestButton = () => useContext(RestButtonContext);

export default function RestButtonProvider({children}: PropsWithChildren) {
  const bleService = useBLEService();
  const [isRest, setIsRest] = useState(false);
  const {showSpinner} = useSpinner();

  const checkIsRest = async () => {
    const characteristic = await bleService.readCharacteristic(
      HEXAPOD_SERVICE_UUID,
      HEXAPOD_REST_CHARACTERISTIC,
    );

    const value = characteristic?.value
      ? base64.decode(characteristic.value)
      : undefined;

    const _isRest = value == '1';

    setIsRest(_isRest);

    return _isRest;
  };

  const updateIsRest = async () => {
    try {
      showSpinner(true);

      await bleService.writeCharacteristicWithResponse(
        HEXAPOD_SERVICE_UUID,
        HEXAPOD_REST_CHARACTERISTIC,
        base64.encode(isRest ? '0' : '1'),
      );

      await checkIsRest();
    } finally {
      showSpinner(false);
    }
  };

  useEffect(() => {
    if (bleService.isConnected) {
      checkIsRest();
    }
  }, [bleService.isConnected]);

  return (
    <RestButtonContext.Provider
      value={{
        isRest,
        checkIsRest,
        updateIsRest,
      }}>
      {children}
    </RestButtonContext.Provider>
  );
}
