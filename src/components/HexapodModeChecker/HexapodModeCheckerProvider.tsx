import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {HEXAPOD_MODE} from '../../enums/Hexapod.enum';
import {useBLEService} from '../BLEServiceProvider/BLEServiceProvider';
import {
  HEXAPOD_MODE_CHARACTERISTIC,
  HEXAPOD_SERVICE_UUID,
} from '../../constants/BLE.constants';
import base64 from 'react-native-base64';

export type HexapodModeCheckerContextType = {
  mode?: HEXAPOD_MODE;
  checkMode: () => Promise<void>;
};

export const HexapodModeCheckerContext =
  createContext<HexapodModeCheckerContextType>({
    checkMode: async () => {},
  });

export const useHexapodModeChecker = () =>
  useContext(HexapodModeCheckerContext);

export default function HexapodModeCheckerProvider({
  children,
}: PropsWithChildren) {
  const [mode, setMode] = useState<HEXAPOD_MODE>();
  const bleService = useBLEService();

  const checkMode = async () => {
    const characteristic = await bleService.readCharacteristic(
      HEXAPOD_SERVICE_UUID,
      HEXAPOD_MODE_CHARACTERISTIC,
    );
    const value = characteristic?.value;

    if (value != undefined) {
      const mode = Number.parseInt(base64.decode(value));
      setMode(mode as HEXAPOD_MODE);
    }
  };

  useEffect(() => {
    if(!bleService.isConnected) {
      setMode(undefined);
    }
  }, [bleService.isConnected])

  return (
    <HexapodModeCheckerContext.Provider
      value={{
        mode,
        checkMode,
      }}>
      {children}
    </HexapodModeCheckerContext.Provider>
  );
}
