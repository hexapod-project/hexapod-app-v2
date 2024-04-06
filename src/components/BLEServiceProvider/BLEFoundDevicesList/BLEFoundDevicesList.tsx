import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Device} from 'react-native-ble-plx';
import {
  ActivityIndicator,
  Badge,
  Button,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import BLEListHeaderComponent from './BLEListHeaderComponent';
import BLEListEmptyComponent from './BLEListEmptyComponent';
import {ExtendedTheme} from '../../../theme';

export type BLEFoundDevicesListProps = {
  devices: Device[];
  connectedDevice?: Device;
  isScanning?: boolean;
  isConnecting?: boolean;
  refresh: () => void;
  stopScan: () => void;
  onDeviceSelected: (device: Device) => void;
};

export type BLEFoundDevicesListType = {
  open: () => void;
  close: () => void;
};

const snapPoints = ['40%'];

const BLEFoundDevicesList = forwardRef<
  BLEFoundDevicesListType,
  BLEFoundDevicesListProps
>(
  (
    {
      devices,
      connectedDevice,
      isScanning,
      isConnecting,
      refresh,
      stopScan,
      onDeviceSelected: onDevicePress,
    },
    ref,
  ) => {
    const theme: ExtendedTheme = useTheme();
    const [snapPointIndex, setSnapPointIndex] = useState(-1);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const data = devices.filter(d => d.id != connectedDevice?.id);
    if (connectedDevice) {
      data.unshift(connectedDevice);
    }

    useImperativeHandle(ref, () => ({
      open: () => setSnapPointIndex(0),
      close: () => bottomSheetRef.current?.close(),
    }));

    const onScanPress = useCallback(() => {
      if (!isScanning) {
        refresh();
      } else {
        stopScan();
      }
    }, [isScanning]);

    const onCloseHandler = () => {
      setSnapPointIndex(-1);
      stopScan();
    };

    const renderItem = ({item: device}: {item: Device}) => (
      <TouchableRipple onPress={() => onDevicePress(device)}>
        <View style={styles.listItemContainer}>
          <Text style={styles.listItem}>{device.name}</Text>
          <Badge
            visible={connectedDevice?.id == device.id}
            style={styles.listItemBadge}
            theme={{colors: {error: theme.colors.success}}}>
            Connected
          </Badge>
        </View>
      </TouchableRipple>
    );

    return (
      <>
        {snapPointIndex >= 0 && (
          <TouchableWithoutFeedback
            onPress={() => bottomSheetRef.current?.close()}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
        )}
        <BottomSheet
          ref={bottomSheetRef}
          style={styles.bottomSheet}
          index={snapPointIndex}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={onCloseHandler}
          onChange={index => setSnapPointIndex(index)}>
          <View style={styles.container}>
            {isScanning && (
              <ActivityIndicator
                style={styles.scanningSpinner}
                color={theme.colors.inverseSurface}
              />
            )}
            {isConnecting && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} />
              </View>
            )}
            <BottomSheetFlatList
              contentContainerStyle={styles.listContentContainer}
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              stickyHeaderIndices={[0]}
              ListHeaderComponent={BLEListHeaderComponent}
              ListEmptyComponent={() => BLEListEmptyComponent({isScanning})}
            />
            <View style={styles.buttonContainer}>
              <Button
                style={styles.scanButton}
                mode="contained"
                theme={{
                  colors: {
                    primary: theme.colors.inverseSurface,
                    surfaceDisabled: `${theme.colors.inverseSurface}55`,
                    onSurfaceDisabled: theme.colors.onPrimary,
                  },
                }}
                onPress={onScanPress}
                disabled={isConnecting}>
                {isScanning ? 'Stop Scan' : 'Refresh'}
              </Button>
            </View>
          </View>
        </BottomSheet>
      </>
    );
  },
);

const styles = StyleSheet.create({
  backdrop: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#0003',
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
  container: {
    flexGrow: 1,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingVertical: 5,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  listItem: {
    fontWeight: '700',
    fontSize: 16,
  },
  listItemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    height: undefined,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  scanButton: {
    flexGrow: 1,
  },
  scanningSpinner: {
    opacity: 0.3,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

BLEFoundDevicesList.displayName = 'BLEFoundDevicesList';

export default BLEFoundDevicesList;
