import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: roughly half the size of WebP for photos, with WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // One quality for every photo: high enough to stay crisp after resizing,
    // while AVIF/WebP keep the files small. The default prop (75) snaps to it.
    qualities: [85],
    // Optimised photos are cached for a month instead of re-encoded per request.
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
