export const randomNumber = (min: number, max: number) => {
  return min + Math.trunc(Math.random() * (max - min));
}