import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: roughly half the size of WebP for photos, with WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // 70 for full-bleed hero photos, 75 (the default) for everything else.
    qualities: [70, 75],
    // Optimised photos are cached for a month instead of re-encoded per request.
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
