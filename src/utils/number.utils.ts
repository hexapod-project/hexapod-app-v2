export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function map(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
) {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}
