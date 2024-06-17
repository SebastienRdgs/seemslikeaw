export const useIsMobile = function () {
  if (process.client) {
    return window.innerWidth < 768;
  }
  return false;
};

export function generateColorGradient(steps: number): string[] {
  const colors = [
    '#00ff00', // white
    '#0000ff', // Blue
    '#800080', // Purple
    '#ff0000', // Red
    '#000000', // Dark Orange
  ];

  const colorGradient: string[] = [];

  // Calculate the number of steps between each color
  const stepsBetweenColors = steps / (colors.length - 1);

  for (let i = 0; i < steps; i++) {
    const colorIndex = Math.floor(i / stepsBetweenColors);
    const lowerColor = colors[colorIndex];
    const upperColor = colors[colorIndex + 1];

    // Calculate the interpolation factor
    const interpolationFactor = (i % stepsBetweenColors) / stepsBetweenColors;

    // Interpolate between the lower and upper colors
    const interpolatedColor = interpolateColors(lowerColor, upperColor, interpolationFactor);
    colorGradient.push(interpolatedColor);
  }

  return colorGradient;
}

function interpolateColors(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
