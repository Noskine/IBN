import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["*"],
  },
  allowedDevOrigins: ["*"]
};

export default nextConfig;
