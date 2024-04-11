import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  Base64,
  BleError,
  BleErrorCode,
  BleManager,
  State as BLEState,
  Characteristic,
  Device,
  DeviceId,
  LogLevel,
  Subscription,
  UUID,
} from 'react-native-ble-plx';

import {useSnackbar} from '../../components/Snackbar';
import {SCAN_DURATION, SERVICE_UUIDS} from '../../constants/BLE.constants';
import BLEFoundDevicesList, {
  BLEFoundDevicesListType,
} from './BLEFoundDevicesList';

export type BLEServiceContextType = {
  init: (poweredOnCallback?: () => void) => void;
  startDeviceScan: () => void;
  stopDeviceScan: () => void;
  writeCharacteristicWithoutResponse: (
    serviceUUID: UUID,
    characteristicUUID: UUID,
    value: Base64,
  ) => void;
  writeCharacteristicWithResponse: (
    serviceUUID: UUID,
    characteristicUUID: UUID,
    value: Base64,
  ) => Promise<Characteristic | undefined>;
  readCharacteristic: (
    serviceUUID: UUID,
    characteristicUUID: UUID,
  ) => Promise<Characteristic | undefined>;
  isScanning: boolean;
  foundDevices: Device[];
  bleState: BLEState;
  isConnected?: boolean;
};

export const BLEServiceContext = createContext<BLEServiceContextType>({
  init: () => {},
  startDeviceScan: () => {},
  stopDeviceScan: () => {},
  writeCharacteristicWithoutResponse: () => {},
  writeCharacteristicWithResponse: async () => undefined,
  readCharacteristic: async () => undefined,
  isScanning: false,
  foundDevices: [],
  bleState: BLEState.Unknown,
});

export const useBLEService = () => useContext(BLEServiceContext);

const manager = new BleManager();

export default function BLEServiceProvider({children}: PropsWithChildren) {
  const [bleState, setBLEState] = useState(BLEState.Unknown);
  const [isFirstPoweredOn, setIsFirstPoweredOn] = useState(true);
  const [foundDevices, setFoundDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [device, setDevice] = useState<Device | undefined>(undefined);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bleFoundDevicesListRef = useRef<BLEFoundDevicesListType>(null);
  const {showSnackbar} = useSnackbar();
  const onDeviceDisconnectedSubscriptionRef = useRef<Subscription | null>(null);

  const requestBluetoothPermission = async () => {
    if (Platform.OS == 'ios') {
      return true;
    }

    console.log(PermissionsAndroid.PERMISSIONS);

    if (
      Platform.OS == 'android' &&
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ) {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }

    showSnackbar({message: 'Permissions not granted.', type: 'warning'});

    return false;
  };

  const onPoweredOffHandler = () => {
    manager.enable().catch(error => {
      if (error.errorCode == BleErrorCode.BluetoothUnauthorized) {
        requestBluetoothPermission();
      }
    });
  };

  const onUnauthorizedHandler = () => {
    requestBluetoothPermission();
  };

  const init = useCallback(() => {
    return new Promise(resolve => {
      const subscription = manager.onStateChange(state => {
        switch (state) {
          case BLEState.Unsupported:
            showSnackbar({
              message: 'Bluetooth is not supported for this device.',
            });
            break;
          case BLEState.PoweredOff:
            onPoweredOffHandler();
            break;
          case BLEState.Unauthorized:
            onUnauthorizedHandler();
            break;
          case BLEState.PoweredOn:
            resolve(null);
            subscription.remove();

            if (isFirstPoweredOn) {
              startDeviceScan();
              setIsFirstPoweredOn(false);
            }
            openFoundDevicesList();
            break;
        }
      }, true);
    });
  }, [isFirstPoweredOn]);

  const startDeviceScan = useCallback(() => {
    if (isScanning) {
      return;
    }

    manager.startDeviceScan(SERVICE_UUIDS, {}, (error, device) => {
      if (error) {
        stopDeviceScan();
        onError(error);
        return;
      }

      if (device) {
        if (!foundDevices.find(found => found.id == device.id)) {
          const newFoundDevices = foundDevices.slice();
          newFoundDevices.push(device);
          setFoundDevices(Array.from(new Set(newFoundDevices)));
        }
      }
    });

    setIsScanning(true);

    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    scanTimeoutRef.current = setTimeout(() => {
      stopDeviceScan();
    }, SCAN_DURATION);
  }, [foundDevices, isScanning]);

  const stopDeviceScan = () => {
    manager.stopDeviceScan();
    setIsScanning(false);
  };

  const refreshFoundDevices = () => {
    setFoundDevices([]);
    startDeviceScan();
  };

  const connectToDevice = useCallback(
    async (deviceId: DeviceId) => {
      try {
        stopDeviceScan();

        setIsConnecting(true);

        const connectedDevice = await manager.connectToDevice(deviceId);

        onDeviceDisconnectedSubscriptionRef.current =
          manager.onDeviceDisconnected(connectedDevice.id, error => {
            setDevice(undefined);

            if (error) {
              onError(error);
            } else {
              showSnackbar({
                message: `${connectedDevice.name} disconnected.`,
                type: 'warning',
              });
            }
          });

        await connectedDevice.discoverAllServicesAndCharacteristics();

        setDevice(connectedDevice);

        showSnackbar({
          message: `Successfully connected to ${connectedDevice?.name}`,
          type: 'success',
        });
      } catch (error: any) {
        const bleError: BleError = error;

        if (
          bleError.errorCode === BleErrorCode.DeviceAlreadyConnected &&
          device
        ) {
          return device;
        } else {
          onError(bleError);
        }
      } finally {
        setIsConnecting(false);
      }
    },
    [device],
  );

  const disconnectDevice = useCallback(async () => {
    if (!device) {
      deviceNotConnectedError();
      return;
    }

    try {
      setIsConnecting(true);

      await manager.cancelDeviceConnection(device?.id);

      onDeviceDisconnectedSubscriptionRef.current?.remove();

      setDevice(undefined);
    } catch (error: any) {
      const bleError: BleError = error;

      if (bleError.errorCode != BleErrorCode.DeviceDisconnected) {
        onError(error);
      }
    } finally {
      setIsConnecting(false);
    }
  }, [device, onDeviceDisconnectedSubscriptionRef.current]);

  const writeCharacteristicWithoutResponse = useCallback(
    async (serviceUUID: UUID, characteristicUUID: UUID, value: Base64) => {
      if (!device) {
        deviceNotConnectedError();
        return;
      }

      try {
        await manager.writeCharacteristicWithoutResponseForDevice(
          device.id,
          serviceUUID,
          characteristicUUID,
          value,
        );
      } catch (error: any) {
        onError(error);
      }
    },
    [device],
  );

  const writeCharacteristicWithResponse = useCallback(
    async (serviceUUID: UUID, characteristicUUID: UUID, value: Base64) => {
      if (!device) {
        deviceNotConnectedError();
        return;
      }

      try {
        const characteristic =
          await manager.writeCharacteristicWithResponseForDevice(
            device.id,
            serviceUUID,
            characteristicUUID,
            value,
          );

        return characteristic;
      } catch (error: any) {
        onError(error);
      }
    },
    [device],
  );

  const readCharacteristic = useCallback(
    async (serviceUUID: UUID, characteristicUUID: UUID) => {
      if (!device) {
        deviceNotConnectedError();
        return;
      }

      try {
        const result = await manager.readCharacteristicForDevice(
          device.id,
          serviceUUID,
          characteristicUUID,
        );

        return result;
      } catch (error: any) {
        onError(error);
      }
    },
    [device],
  );

  const onDeviceSelected = useCallback(
    (selectedDevice: Device) => {
      if (selectedDevice.id === device?.id) {
        disconnectDevice();
      } else {
        connectToDevice(selectedDevice.id);
      }
    },
    [device],
  );

  const onError = (error: BleError) => {
    console.log(error);
    switch (error.errorCode) {
      case BleErrorCode.BluetoothUnauthorized:
        requestBluetoothPermission();
        break;
      case BleErrorCode.LocationServicesDisabled:
        showSnackbar({
          message: 'Location services are disabled',
          type: 'error',
        });
        break;
      case BleErrorCode.CharacteristicNotFound:
        showSnackbar({
          message: 'BLE feature not available',
          type: 'error',
        });
        break;
      case BleErrorCode.DeviceNotConnected:
        setDevice(undefined);
      default:
        showSnackbar({
          message: error.message,
          type: 'error',
        });
    }
  };

  const deviceNotConnectedError = () => {
    showSnackbar({message: 'No hexapod connected.', type: 'error'});
  };

  const openFoundDevicesList = useCallback(() => {
    bleFoundDevicesListRef.current?.open();
  }, [bleFoundDevicesListRef]);

  useLayoutEffect(() => {
    manager.setLogLevel(LogLevel.Error);
  }, []);

  useEffect(() => {
    manager.state().then(state => setBLEState(state));
    manager.onStateChange(state => setBLEState(state));
  }, []);

  return (
    <BLEServiceContext.Provider
      value={{
        init,
        startDeviceScan,
        stopDeviceScan,
        writeCharacteristicWithoutResponse,
        writeCharacteristicWithResponse,
        readCharacteristic,
        isScanning,
        foundDevices,
        bleState,
        isConnected: Boolean(device),
      }}>
      {children}
      <BLEFoundDevicesList
        ref={bleFoundDevicesListRef}
        connectedDevice={device}
        devices={foundDevices}
        isScanning={isScanning}
        isConnecting={isConnecting}
        refresh={refreshFoundDevices}
        stopScan={stopDeviceScan}
        onDeviceSelected={onDeviceSelected}
      />
    </BLEServiceContext.Provider>
  );
}
