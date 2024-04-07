export const numberToBytes = (value: number) => {
  const byteSize = Math.ceil(value.toString(2).length / 8);

  let byteArray = new Uint8Array(byteSize);
  for (let i = 0; i < byteSize; i++) {
    byteArray[i] = (value >> (8 * (byteSize - 1 - i))) & 0xff;
  }

  return byteArray;
};

export const joinByteArrays = (...bytes: Uint8Array[]) => {
  const totalByteSize = bytes.reduce((prev, curr) => prev + curr.length, 0);

  const byteArray = new Uint8Array(totalByteSize);

  for (let i = 0; i < bytes.length; i++) {
    for (let j = 0; j < bytes[i].length; j++) {
      const index = i * bytes[Math.max(0, i - 1)].length + j;
      byteArray[index] = bytes[i][j];
    }
  }

  return byteArray;
};

export const stringToBytes = (string: string) =>
  Uint8Array.from(string.split('').map(x => x.charCodeAt(0)));

export const bytesToNumber = (bytes: Uint8Array, byteSize = 2) => {
  const arraySize = bytes.length / byteSize;
  const array: number[] = [];

  for (let i = 0; i < arraySize; i++) {
    let result = 0;
    for (let j = 0; j < byteSize; j++) {
      const value = bytes[i * byteSize + j];
      result |= value << (8 * (byteSize - 1 - j));
    }

    array.push(result);
  }

  return array;
};
