export const degToRad = (angle: number) => (angle * Math.PI) / 180;
export const radToDeg = (angle: number) => (angle * 180) / Math.PI;

export const clampTo360Deg = (deg: number) => {
  if (Math.abs(deg) > 360) {
    deg = Math.sign(Math.abs(deg) % 360) * deg;
  }

  return deg;
};

export const toPositiveDeg = (deg: number) => {
  if (deg < 0) deg = 360 + deg;

  return Math.abs(deg);
};
