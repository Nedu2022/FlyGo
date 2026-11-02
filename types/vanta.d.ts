declare module "vanta/dist/vanta.dots.min" {
  type VantaEffect = { destroy: () => void };
  const DOTS: (options: Record<string, unknown>) => VantaEffect;
  export default DOTS;
}

declare module "three";
