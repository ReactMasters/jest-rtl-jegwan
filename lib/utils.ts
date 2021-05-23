type RGB = [number, number, number];
export const hexToRgb = (hex: string): RGB => {
  hex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r, g, b) => r + r + g + g + b + b
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return result.map((v) => parseInt(v, 16)).slice(1) as RGB;
};
export const classNames = (
  className: string | undefined | (string | undefined)[]
): string | undefined => {
  if (Array.isArray(className)) {
    return className.filter((cn) => !!cn).join(" ");
  } else {
    return className;
  }
};
