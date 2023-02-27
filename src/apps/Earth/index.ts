const coordinateToPosition = (lat: number, lng: number, radius: number) => {
  const phi: number = (90 - lat) * (Math.PI / 180);
  const theta: number = (lng + 180) * (Math.PI / 180);
  const x: number = -(radius * Math.sin(phi) * Math.cos(theta));
  const z: number = radius * Math.sin(phi) * Math.sin(theta);
  const y: number = radius * Math.cos(phi);
  return { x: x.toFixed(6), y: y.toFixed(6), z: z.toFixed(6) };
};
export { coordinateToPosition };
