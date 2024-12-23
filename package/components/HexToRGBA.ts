/**
 * Converts a hex color code to RGBA format.
 *
 * @param {string} hex - The hex color code (e.g., "#FF5733" or "FF5733").
 * @param {number} opacity - The opacity level (0.0 to 1.0).
 * @returns {string} - The rgba representation of the color (e.g., "rgba(255, 87, 51, 0.5)").
 */
const HexToRGBA = (hex: string, opacity: number): string => {
  const sanitizedHex = hex.replace(/^#/, "");
  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);
  const validOpacity = Math.max(0, Math.min(1, opacity));
  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
};

export default HexToRGBA;
