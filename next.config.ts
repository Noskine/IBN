import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com', pathname: '/photos/34601164/pexels-photo-34601164.jpeg' }]
  },
  allowedDevOrigins: ["*"]
};

export default nextConfig;
