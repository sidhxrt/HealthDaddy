const PI = 3.14159265359;

export function toRadians(degress: number | null) {
  return degress ? (degress / 180) * PI : null;
}
