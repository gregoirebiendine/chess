export const remap = (value: number, sourceMin: number, sourceMax: number, destMin = 0, destMax = 1) => destMin + ((value - sourceMin) / (sourceMax - sourceMin)) * (destMax - destMin);
 