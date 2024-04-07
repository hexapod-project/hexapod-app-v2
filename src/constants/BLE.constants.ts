import {UUID} from 'react-native-ble-plx';

export const SCAN_DURATION = 30000;

export const MOTION_SERVICE_UUID: UUID = '42e91a79-610e-40b3-8873-fd65d2c0d581';
export const MOVE_CHARACTERISTIC_UUID: UUID =
  '7e3b9a17-44bb-4f39-9ff7-d2e8c1e4aa62';
export const ROTATE_CHARACTERISTIC_UUID: UUID =
  'a57dcdea-ef1f-43ae-b7b6-76dcd5c4f0e4';
export const ROLLPITCH_CHARACTERISTIC_UUID: UUID =
  'e8207c3d-4d25-494f-8b3d-b2c2af7e96e9';

export const CALIBRATE_SERVICE_UUID: UUID =
  '2f35a75b-1a6c-481d-b781-22f5d3c17420';
export const PWM_PULSE_CHARACTERISTIC_UUID: UUID =
  '9e31f7cb-82d7-45e2-9484-78aef34d4a7a';
export const MOVE_SERVO_CHARACTERISTIC_UUID: UUID =
  'c4d6a3b7-5b22-4ec0-9bc3-e1194cb9782d';

export const HEXAPOD_SERVICE_UUID: UUID =
  'a9b02c9e-1b0b-4b97-8b68-80af4a3bc6c4';

export const HEXAPOD_MODE_CHARACTERISTIC: UUID =
  'e87e1c16-1a8d-4e0e-b6af-6c4a22bbd1ae';

export const SERVICE_UUIDS = [MOTION_SERVICE_UUID, CALIBRATE_SERVICE_UUID];
