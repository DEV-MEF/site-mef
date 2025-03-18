import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        BASE_SERVER_API: process.env.BASE_SERVER_API
    }
};

export default nextConfig;
