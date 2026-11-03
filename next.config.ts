import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local photos are already compressed WebP; bypass per-request AVIF encoding.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/images/photos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
